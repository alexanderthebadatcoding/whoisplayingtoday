import { useState, useEffect, useCallback, useRef } from "react";
import { RefreshCw } from "lucide-react";

const SPORTS = [
  {
    slug: "nba",
    title: "NBA 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
  },
  {
    slug: "ncaav",
    title: "College Womens Volleyball 🏐",
    url: "https://site.api.espn.com/apis/site/v2/sports/volleyball/womens-college-volleyball/scoreboard",
  },
  {
    slug: "wnba",
    title: "WNBA 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/wnba/scoreboard",
  },
  {
    slug: "nbaSummer",
    title: "NBA Summer League",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba-summer/scoreboard",
  },
  {
    slug: "fiba",
    title: "FIBA 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/fiba/scoreboard",
  },
  {
    slug: "mens-college-basketball",
    title: "Men's College Basketball 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard",
  },
  {
    slug: "American-college-basketball",
    title: "American Conference 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=62",
  },
  {
    slug: "summit-college-basketball",
    title: "Summit League 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?groups=49",
  },
  {
    slug: "mens-olympics-basketball",
    title: "Men's Olympic Basketball 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/mens-olympics-basketball/scoreboard",
  },
  {
    slug: "nbl",
    title: "NBL 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nbl/scoreboard",
  },
  {
    slug: "womens-college-basketball",
    title: "Women's College Basketball 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/womens-college-basketball/scoreboard",
  },
  {
    slug: "womens-olympics-basketball",
    title: "Women's Olympic Basketball 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/womens-olympics-basketball/scoreboard",
  },
  {
    slug: "nfl",
    title: "NFL 🏈",
    url: "https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard",
  },
  {
    slug: "cfb",
    title: "College Football 🏈",
    url: "https://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard",
  },
  {
    slug: "cfl",
    title: "CFL 🏈",
    url: "https://site.api.espn.com/apis/site/v2/sports/football/cfl/scoreboard",
  },
  {
    slug: "ufl",
    title: "UFL 🏈",
    url: "https://site.api.espn.com/apis/site/v2/sports/football/ufl/scoreboard",
  },
  {
    slug: "xfl",
    title: "XFL 🏈",
    url: "https://site.api.espn.com/apis/site/v2/sports/football/xfl/scoreboard",
  },
  {
    slug: "hockey-world-cup",
    title: "Hockey World Cup 🏒",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/hockey-world-cup/scoreboard",
  },
  {
    slug: "mens-college-hockey",
    title: "Men's College Hockey 🏒",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/mens-college-hockey/scoreboard",
  },
  {
    slug: "nhl",
    title: "NHL 🏒",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/nhl/scoreboard",
  },
  {
    slug: "olympics-mens-ice-hockey",
    title: "Men's Olympic Ice Hockey 🏒",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/olympics-mens-ice-hockey/scoreboard",
  },
  {
    slug: "olympics-womens-ice-hockey",
    title: "Women's Olympic Ice Hockey 🏒",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/olympics-womens-ice-hockey/scoreboard",
  },
  {
    slug: "womens-college-hockey",
    title: "Women's College Hockey 🏒",
    url: "https://site.api.espn.com/apis/site/v2/sports/hockey/womens-college-hockey/scoreboard",
  },
  {
    slug: "mlb",
    title: "MLB ⚾️",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard",
  },
  {
    slug: "caribbean-series",
    title: "Caribbean Series ⚾",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/caribbean-series/scoreboard",
  },

  {
    slug: "dominican-winter-league",
    title: "Dominican Winter League ⚾",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/dominican-winter-league/scoreboard",
  },
  {
    slug: "mexican-winter-league",
    title: "Mexican Winter League ⚾",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/mexican-winter-league/scoreboard",
  },
  {
    slug: "olympics-baseball",
    title: "Olympic Baseball ⚾",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/olympics-baseball/scoreboard",
  },
  {
    slug: "mls",
    title: "MLS ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.1/scoreboard",
  },
  {
    slug: "nwsl",
    title: "NWSL ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.nwsl/scoreboard",
  },
  {
    slug: "epl",
    title: "English Premier League ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard",
  },
  {
    slug: "engFA",
    title: "English FA Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.fa/scoreboard",
  },
  {
    slug: "laliga",
    title: "La Liga ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard",
  },
  {
    slug: "bundesliga",
    title: "Bundesliga ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard",
  },
  {
    slug: "b2",
    title: "2. Bundesliga ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ger.2/scoreboard",
  },
  {
    slug: "uefa",
    title: "UEFA Champions League ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard",
  },
  {
    slug: "uefaNations",
    title: "UEFA Nations League ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.nations/scoreboard",
  },
  {
    slug: "concacaf",
    title: "Concacaf Nations League ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/concacaf.nations.league/scoreboard",
  },
  {
    slug: "concacafCup",
    title: "Concacaf Champions Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/concacaf.champions/scoreboard",
  },
  {
    slug: "concacafLeagues",
    title: "Concacaf Leagues Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/concacaf.leagues.cup/scoreboard",
  },
  {
    slug: "italiaSerieA",
    title: "Italy Serie A ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard",
  },
  {
    slug: "italyCup",
    title: "Supercoppa Italiana ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ita.super_cup/scoreboard",
  },
  {
    slug: "WorldCup",
    title: "FIFA World Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard",
  },
  {
    slug: "cafNations",
    title: "Africa Cup of Nations⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/caf.nations/scoreboard",
  },
  {
    slug: "concacafGold",
    title: "Concacaf Gold Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/concacaf.gold/scoreboard",
  },
  {
    slug: "open",
    title: "USA Open Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.open/scoreboard",
  },
  {
    slug: "club",
    title: "Club Friendly ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/club.friendly/scoreboard",
  },
  {
    slug: "fifa",
    title: "FIFA Friendlies ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.friendly/scoreboard",
  },
  {
    slug: "fifaw",
    title: "FIFA Women's Friendlies ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.friendly.w/scoreboard",
  },
  {
    slug: "cwc",
    title: "FIFA Club World Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.cwc/scoreboard",
  },
  {
    slug: "sheBelieves",
    title: "She Believes Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.shebelieves/scoreboard",
  },
  {
    slug: "fifaconQ",
    title: "FIFA World Cup Qualifying - Concacaf",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.worldq.concacaf/scoreboard",
  },
  {
    slug: "worldq",
    title: "World Cup Qualifying - UEFA",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.worldq.uefa/scoreboard",
  },
  {
    slug: "worldAFC",
    title: "World Cup Qualifying - AFC",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.worldq.afc/scoreboard",
  },
  {
    slug: "weuro",
    title: "Womens European Championship",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.weuro/scoreboard",
  },
  {
    slug: "germanCup",
    title: "German Cup",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ger.dfb_pokal/scoreboard",
  },
  {
    slug: "EUQual",
    title: "Europa League Qualifying",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa_qual/scoreboard",
  },
  {
    slug: "ncaaSoccer",
    title: "NCAA Mens ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.ncaa.m.1/scoreboard",
  },
  {
    slug: "ncaaWSoccer",
    title: "NCAA Womens ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.ncaa.w.1/scoreboard",
  },
  {
    slug: "fifa.world",
    title: "FIFA World Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard",
  },
  {
    slug: "fifa.wwc",
    title: "FIFA Women's World Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.wwc/scoreboard",
  },
  {
    slug: "nba.g",
    title: "NBA G League 🏀",
    url: "https://site.api.espn.com/apis/site/v2/sports/basketball/nba-development/scoreboard",
  },
  {
    slug: "eng.league_cup",
    title: "English League Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/eng.league_cup/scoreboard",
  },
  {
    slug: "esp.1",
    title: "Spanish La Liga ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard",
  },
  {
    slug: "ned.1",
    title: "Dutch Eredivisie ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ned.1/scoreboard",
  },
  {
    slug: "esp.super_cup",
    title: "Spanish Super Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.super_cup/scoreboard",
  },
  {
    slug: "esp.copa_del_rey",
    title: "Copa del Rey ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/esp.copa_del_rey/scoreboard",
  },
  {
    slug: "concacaf.leagues.cup",
    title: "Leagues Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/concacaf.leagues.cup/scoreboard",
  },
  {
    slug: "campeones.cup",
    title: "Campeones Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/campeones.cup/scoreboard",
  },
  {
    slug: "uefa.wchampions",
    title: "UEFA Women's Champions League ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.wchampions/scoreboard",
  },
  {
    slug: "usa.nwsl.cup",
    title: "NWSL Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/usa.nwsl.cup/scoreboard",
  },
  {
    slug: "uefa.europa",
    title: "UEFA Europa League ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa/scoreboard",
  },
  {
    slug: "uefa.europa.conf",
    title: "UEFA Europa Conference League ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/uefa.europa.conf/scoreboard",
  },
  {
    slug: "mex.1",
    title: "Liga MX ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/mex.1/scoreboard",
  },
  {
    slug: "ita.coppa_italia",
    title: "Coppa Italia ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/ita.coppa_italia/scoreboard",
  },
  {
    slug: "fra.1",
    title: "French Ligue 1 ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard",
  },
  {
    slug: "fra.super_cup",
    title: "French Super Cup ⚽️",
    url: "https://site.api.espn.com/apis/site/v2/sports/soccer/fra.super_cup/scoreboard",
  },
  {
    slug: "college-softball",
    title: "College Softball 🥎",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/college-softball/scoreboard",
  },
  {
    slug: "college-baseball",
    title: "College Baseball ⚾",
    url: "https://site.api.espn.com/apis/site/v2/sports/baseball/college-baseball/scoreboard",
  }
];

function App() {
  const [gamesData, setGamesData] = useState({});
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [seasonCache, setSeasonCache] = useState(() => {
    try {
      const raw = localStorage.getItem("seasonCache");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const [lastSeasonCheck, setLastSeasonCheck] = useState(() => {
    try {
      const raw = localStorage.getItem("lastSeasonCheck");
      return raw ? new Date(raw) : null;
    } catch {
      return null;
    }
  });

  // Track only-live-refresh state so the UI can show a focused spinner
  const [isRefreshingLive, setIsRefreshingLive] = useState(false);

  // Refs to avoid stale closures inside a stable fetchGames callback
  const seasonCacheRef = useRef(seasonCache);
  const lastSeasonCheckRef = useRef(lastSeasonCheck);
  const fetchInFlightRef = useRef(false);

  useEffect(() => {
    seasonCacheRef.current = seasonCache;
    try {
      localStorage.setItem("seasonCache", JSON.stringify(seasonCache));
    } catch {
      // Silently ignore localStorage errors (e.g., quota exceeded, private browsing)
    }
  }, [seasonCache]);

  useEffect(() => {
    lastSeasonCheckRef.current = lastSeasonCheck;
    try {
      if (lastSeasonCheck)
        localStorage.setItem("lastSeasonCheck", lastSeasonCheck.toISOString());
    } catch (e) {
      // Silently ignore localStorage errors (e.g., quota exceeded, private browsing)
    }
  }, [lastSeasonCheck]);

  const isInSeason = (startDate, endDate) => {
    if (!startDate || !endDate) return true; // If no season dates, assume active
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    return today >= start && today <= end;
  };

  const isToday = (dateString) => {
    if (!dateString) return false;
    const gameDate = new Date(dateString);
    const today = new Date();
    return (
      gameDate.getDate() === today.getDate() &&
      gameDate.getMonth() === today.getMonth() &&
      gameDate.getFullYear() === today.getFullYear()
    );
  };

  const shouldRecheckSeasons = () => {
    const last = lastSeasonCheckRef.current;
    if (!last) return true;
    const hoursSinceCheck = (new Date() - new Date(last)) / (1000 * 60 * 60);
    return hoursSinceCheck >= 24; // Re-check season dates once per day
  };

  // Get list of sport slugs that currently have live (in-progress) games
  const getLiveSportsFromGamesData = () => {
    const live = [];
    for (const [slug, { games }] of Object.entries(gamesData)) {
      if (!games || games.length === 0) continue;
      const hasLive = games.some((g) => {
        const comp = g?.competitions?.[0];
        const state = comp?.status?.type?.state;
        return state === "in";
      });
      if (hasLive) live.push(slug);
    }
    return live;
  };

  // Fetch helper for a single sport; returns an object to merge into results or null
  const fetchSport = async (sport, { recheckSeasons = false } = {}) => {
    try {
      // Skip if cached out-of-season and not rechecking
      if (!recheckSeasons && seasonCacheRef.current[sport.slug] === false)
        return null;

      const res = await fetch(sport.url);
      if (!res.ok) {
        console.error(`Fetch failed for ${sport.title}: ${res.status}`);
        return null;
      }
      const data = await res.json();

      const seasonStart = data?.leagues?.[0]?.season?.startDate;
      const seasonEnd = data?.leagues?.[0]?.season?.endDate;
      const inSeason = isInSeason(seasonStart, seasonEnd);

      // If out of season, update cache and skip
      if (!inSeason) {
        return { slug: sport.slug, value: null, inSeason: false };
      }

      // Filter today's games
      const todaysGames =
        Array.isArray(data.events) && data.events.length > 0
          ? data.events.filter((event) =>
              isToday(event?.competitions?.[0]?.startDate)
            )
          : [];

      if (todaysGames.length === 0) {
        return { slug: sport.slug, value: null, inSeason: true };
      }

      return {
        slug: sport.slug,
        value: {
          title: sport.title,
          games: todaysGames,
        },
        inSeason: true,
      };
    } catch (err) {
      console.error(`Error fetching ${sport.title}:`, err);
      return null;
    }
  };

  // Stable fetchGames using refs to avoid re-creating the callback on every render.
  // Options:
  //   { forceSeasonCheck?: boolean, onlyLive?: boolean }
  const fetchGames = useCallback(
    async (options = {}) => {
      const { forceSeasonCheck = false, onlyLive = false } = options;

      // Prevent overlapping fetches; allow a live-only refresh to run even if a full fetch is in-flight
      if (fetchInFlightRef.current && !onlyLive) {
        return;
      }
      if (!onlyLive) {
        fetchInFlightRef.current = true;
        setLoading(true);
      }

      const recheckSeasons = forceSeasonCheck || shouldRecheckSeasons();
      const newSeasonCache = { ...seasonCacheRef.current };
      const results = {};

      // Determine which sports to fetch
      let sportsToFetch;
      if (onlyLive) {
        const liveSlugs = getLiveSportsFromGamesData();
        if (liveSlugs.length === 0) {
          // fallback to fetch all (no live games known)
          sportsToFetch = SPORTS;
        } else {
          const slugSet = new Set(liveSlugs);
          sportsToFetch = SPORTS.filter((s) => slugSet.has(s.slug));
        }
      } else {
        sportsToFetch = SPORTS;
      }

      // Perform concurrent fetches (Promise.allSettled). This is faster than serial fetches.
      // If you run into rate-limiting, consider batching with a concurrency limit.
      const promises = sportsToFetch.map((s) =>
        fetchSport(s, { recheckSeasons })
      );
      const settled = await Promise.allSettled(promises);

      // Process results
      for (const r of settled) {
        if (r.status !== "fulfilled" || !r.value) continue;
        const { slug, value, inSeason } = r.value;
        // Update season cache entry
        newSeasonCache[slug] = !!inSeason;
        if (value) {
          results[slug] = value;
        }
      }

      // Persist season cache if we rechecked
      if (recheckSeasons) {
        setSeasonCache(newSeasonCache);
        seasonCacheRef.current = newSeasonCache;
        const now = new Date();
        setLastSeasonCheck(now);
        lastSeasonCheckRef.current = now;
      }

      // Merge or replace gamesData depending on onlyLive
      if (onlyLive) {
        setGamesData((prev) => {
          // copy previous and only overwrite the sports we fetched
          const next = { ...prev };
          for (const [slug, data] of Object.entries(results)) {
            next[slug] = data;
          }
          // Remove sports we fetched that now have no games (results doesn't include nulls)
          // but we want to leave non-fetched sports alone. For fetched slugs that returned no games,
          // we should remove them if they had no games anymore.
          for (const s of sportsToFetch) {
            if (!results[s.slug] && next[s.slug]) {
              // sport was fetched but returned no games -> delete
              delete next[s.slug];
            }
          }
          return next;
        });
      } else {
        // full replace (only include sports that have games today)
        setGamesData(results);
      }

      setLastUpdate(new Date());

      if (!onlyLive) {
        setLoading(false);
        fetchInFlightRef.current = false;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ); // empty deps because we rely on refs for mutable state

  useEffect(() => {
    // initial fetch (deferred to avoid synchronous setState in effect)
    const id = setTimeout(() => {
      fetchGames();
    }, 0);
    return () => clearTimeout(id);
  }, [fetchGames]);

  useEffect(() => {
    const interval = setInterval(() => {
      // auto-refresh: be conservative and refresh only sports we already have (faster)
      fetchGames({ onlyLive: false }); // you can change this to { onlyLive: true } to only refresh live games automatically
    }, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchGames]);

  const formatGameDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    try {
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return date.toString();
    }
  };

  const getStatusDisplay = (competition) => {
    const status = competition?.status;
    const type = status?.type;
    const state = type?.state;
    if (!type || !state) {
      return { text: "TBD", color: "text-gray-500", bg: "bg-gray-100" };
    }
    if (state === "pre") {
      return {
        text: type.description || "Pre-game",
        color: "text-gray-500",
        bg: "bg-gray-100",
      };
    } else if (state === "in") {
      return {
        text: type.shortDetail || type.detail || "In Progress",
        color: "text-red-600",
        bg: "bg-red-50",
      };
    } else {
      return { text: "Final", color: "text-gray-700", bg: "bg-gray-100" };
    }
  };

  const GameCard = ({ game }) => {
    const competition = game?.competitions?.[0] || {};
    const homeTeam = (competition.competitors || []).find(
      (t) => t.homeAway === "home"
    );
    const awayTeam = (competition.competitors || []).find(
      (t) => t.homeAway === "away"
    );
    const status = getStatusDisplay(competition);
    const gameDate = formatGameDate(competition?.startDate);
    const broadcast = competition?.broadcasts?.[0]?.names?.[0] || "";

    return (
      <div className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <div
            className={`text-xs font-semibold px-2 py-1 rounded ${status.bg} ${status.color}`}
          >
            {status.text}
          </div>
          <div className="text-xs text-gray-500">{broadcast}</div>
        </div>
        <div className="text-xs text-gray-800 mb-3">{gameDate}</div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              {awayTeam?.team?.logo && (
                <img src={awayTeam.team.logo} alt="" className="w-8 h-8" />
              )}
              <span className="font-medium">
                {awayTeam?.team?.displayName || "Away"}
              </span>
            </div>
            <span className="text-xl font-bold ml-4">
              {awayTeam?.score ?? "0"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              {homeTeam?.team?.logo && (
                <img src={homeTeam.team.logo} alt="" className="w-8 h-8" />
              )}
              <span className="font-medium">
                {homeTeam?.team?.displayName || "Home"}
              </span>
            </div>
            <span className="text-xl font-bold ml-4">
              {homeTeam?.score ?? "0"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Today's Games</h1>
          <button
            onClick={() => {
              // If we have no known games, do a full fetch; otherwise refresh only live games
              if (Object.keys(gamesData).length === 0) {
                setLoading(true);
                fetchGames({ forceSeasonCheck: true }).finally(() =>
                  setLoading(false)
                );
              } else {
                setIsRefreshingLive(true);
                // Refresh only live games (faster). We avoid setting global loading to reduce UI churn.
                fetchGames({ onlyLive: true })
                  .catch((err) => console.error(err))
                  .finally(() => setIsRefreshingLive(false));
              }
            }}
            disabled={(loading && !isRefreshingLive) || isRefreshingLive}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw
              className={`w-4 h-4 ${
                loading || isRefreshingLive ? "animate-spin" : ""
              }`}
            />
            Refresh
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>

        {loading && Object.keys(gamesData).length === 0 ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-2" />
            <p className="text-gray-600">Loading games...</p>
          </div>
        ) : Object.keys(gamesData).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">
              No games scheduled for today
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(gamesData).map(([slug, data]) => (
              <div key={slug}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  {data.title}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.games.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
