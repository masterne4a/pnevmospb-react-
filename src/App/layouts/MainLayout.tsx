import type { ChangeEvent, ReactNode } from 'react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { SearchProvider } from '../../shared/context/SearchContext';
import styles from './MainLayout.module.css';
import { FooterUI } from '../../shared/ui/Footer/Footer';
import { HeaderUI } from '../../shared/ui/Header/Header';

function MainLayoutContent(): ReactNode{
  return(
    <div className={styles.layout}>
      <HeaderUI />
      <main className={styles.main}>
        <Outlet />
      </main>
      <FooterUI />
    </div>
  )
}
/*import { FooterUI } from 'shared/ui/Footer/FooterUI';
import { HeaderUI } from '../../shared/ui/Header';
import { NotificationBanner } from '../../shared/ui/NotificationBanner';
import { tokenStorage } from '../../shared/lib';
import { getAvatarUrl, API_BASE_URL } from '../../shared/config';
import {
  fetchNotifications,
  markAllAsRead,
  clearViewedNotifications,
  markAsRead,
} from '../../shared/api/notifications/notifications';
import { SkillsCatalogModal } from '../../shared/ui/SkillsCatalogModal/SkillsCatalogModal';
import { SearchProvider } from '../../shared/context/SearchContext';
import { useSearch } from '../../shared/hooks/useSearch';
import type { IUser } from '../../shared/types/user';
import type { TSkill } from '../../shared/types/skill';
import type { Notification } from '../../shared/ui/NotificationsDropdown/types';
import styles from './MainLayout.module.css';

const THEME_STORAGE_KEY = 'skillswap-theme';
const NOTIFICATIONS_POLL_INTERVAL_MS = 30000;
const NOTIFICATION_BANNER_AUTO_CLOSE_DELAY_MS = 5000;

function resolveAvatarUrl(storedUrl: string | null, userId: string): string {
  if (!storedUrl) return getAvatarUrl(userId);
  if (storedUrl.startsWith('http://') || storedUrl.startsWith('https://')) return storedUrl;
  const base = API_BASE_URL.replace(/\/$/, '');
  return `${base}${storedUrl.startsWith('/') ? '' : '/'}${storedUrl}`;
}

function buildAuthUser(userId: string): IUser {
  const teaching: TSkill = { id: `t-${userId}`, name: '', category: 'education' };
  const name = tokenStorage.getUserName() ?? 'Пользователь';
  const avatar = resolveAvatarUrl(tokenStorage.getUserAvatarUrl(), userId);
  return {
    id: userId,
    name,
    location: '',
    age: 0,
    about: '',
    avatar,
    teaching,
    learning: [],
  };
}

function MainLayoutContent(): ReactNode {
  const { setSearchQuery } = useSearch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme !== null) return savedTheme === 'dark';
    return globalThis.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkTheme) {
      root.dataset.theme = 'dark';
      localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    } else {
      root.dataset.theme = 'light';
      localStorage.setItem(THEME_STORAGE_KEY, 'light');
    }
  }, [isDarkTheme]);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(THEME_STORAGE_KEY) === null) {
        setIsDarkTheme(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bannerQueue, setBannerQueue] = useState<Notification[]>([]);
  const [activeBanner, setActiveBanner] = useState<Notification | null>(null);
  const hasLoadedNotificationsRef = useRef(false);
  const seenNotificationIdsRef = useRef<Set<number>>(new Set());
  const handleThemeToggle = () => {
    setIsDarkTheme((prev) => !prev);
  };

  const token = tokenStorage.getToken();
  const userId = tokenStorage.getUserId();
  const isAuth = Boolean(token && userId);
  const user = isAuth && userId ? buildAuthUser(userId) : undefined;

  const resetNotificationsState = useCallback(() => {
    setNotifications([]);
    setBannerQueue([]);
    setActiveBanner(null);
    hasLoadedNotificationsRef.current = false;
    seenNotificationIdsRef.current = new Set();
  }, []);

  const loadNotifications = useCallback(async () => {
    if (!isAuth) {
      resetNotificationsState();
      return;
    }

    try {
      const data: Notification[] = await fetchNotifications();

      if (hasLoadedNotificationsRef.current) {
        const freshNotifications = data.filter(
          (notification) =>
            !notification.isRead && !seenNotificationIdsRef.current.has(notification.id)
        );

        if (freshNotifications.length > 0) {
          setBannerQueue((prev) => [...prev, ...freshNotifications]);
        }
      }

      seenNotificationIdsRef.current = new Set(data.map((notification) => notification.id));
      hasLoadedNotificationsRef.current = true;
      setNotifications(data);
    } catch {
       ошибка загрузки — состояние не меняем 
    }
  }, [isAuth, resetNotificationsState]);

  useEffect(() => {
    if (!isAuth) {
      resetNotificationsState();
      return () => {};
    }

    loadNotifications().catch(() => {
       ignore 
    });
    const intervalId = globalThis.setInterval(() => {
      loadNotifications().catch(() => {
         ignore 
      });
    }, NOTIFICATIONS_POLL_INTERVAL_MS);

    return () => {
      globalThis.clearInterval(intervalId);
    };
  }, [isAuth, loadNotifications, resetNotificationsState]);

  useEffect(() => {
    if (activeBanner || bannerQueue.length === 0) return;

    const [nextBanner, ...restQueue] = bannerQueue;
    setActiveBanner(nextBanner);
    setBannerQueue(restQueue);
  }, [activeBanner, bannerQueue]);

  const handleBannerClose = useCallback(() => {
    setActiveBanner(null);
  }, []);

  const handleMarkAllNotificationsAsRead = useCallback(async () => {
    try {
      setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })));
      await markAllAsRead();
    } catch {
      loadNotifications().catch(() => {
         ignore 
      });
    }
  }, [loadNotifications]);

  const handleClearReadNotifications = useCallback(async () => {
    try {
      setNotifications((prev) => prev.filter((notification) => !notification.isRead));
      await clearViewedNotifications();
    } catch {
      loadNotifications().catch(() => {
         ignore 
      });
    }
  }, [loadNotifications]);

  const handleNotificationAction = useCallback(
    async (notificationId: number, relatedUserId: number) => {
      if (!relatedUserId) {
        return;
      }

      navigate(`/offer/${relatedUserId}`);

      try {
        await markAsRead(notificationId);
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationId ? { ...notification, isRead: true } : notification
          )
        );
      } catch {
        loadNotifications().catch(() => {
           ignore 
        });
      }
    },
    [loadNotifications, navigate]
  );

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    },
    [setSearchQuery]
  );

  return (
    <div className={styles.layout}>
      <HeaderUI
        user={user}
        isAuth={isAuth}
        notifications={notifications}
        isNavOpen={isNavOpen}
        isDarkTheme={isDarkTheme}
        onNavButtonClick={() => {
          setIsNavOpen((prev) => !prev);
        }}
        onSearchInputChange={handleSearchInputChange}
        onThemeTogglerClick={handleThemeToggle}
        onLoginClick={() =>
          navigate('/login', {
            state: { from: `${location.pathname}${location.search}` },
          })
        }
        onRegisterClick={() => navigate('/register')}
        // {onNotificationsButtonClick={() => {}}}
        onLikeButtonClick={() => {}}
        onMarkAllNotificationsAsRead={handleMarkAllNotificationsAsRead}
        onClearReadNotifications={handleClearReadNotifications}
        onNotificationAction={handleNotificationAction}
        isDropdownOpen={isDropdownOpen}
        onUserClick={() => setIsDropdownOpen(true)}
        onDropdownClose={() => setIsDropdownOpen(false)}
      />
      {activeBanner && (
        <div className={styles.notificationBanner}>
          <NotificationBanner
            message={activeBanner.message}
            onClose={handleBannerClose}
            autoCloseDelay={NOTIFICATION_BANNER_AUTO_CLOSE_DELAY_MS}
          />
        </div>
      )}
      <main className={styles.main}>
        <Outlet />
      </main>
      <SkillsCatalogModal open={isNavOpen} onClose={() => setIsNavOpen(false)} />
      <FooterUI />
    </div>
  );
}*/

export function MainLayout(): ReactNode {
  return (
    <SearchProvider>
      <MainLayoutContent />
    </SearchProvider>
  );
}