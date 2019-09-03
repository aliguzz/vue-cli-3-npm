import Vue from "vue";
import Router from "vue-router";
//import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
    mode: process.env.CORDOVA_PLATFORM ? "hash" : "hash",
    base: process.env.BASE_URL,
    routes: [{
            path: "/login",
            name: "login",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Login.vue")
        },
        {
            path: "/",
            name: "splash",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Splash.vue")
        },
        {
            path: "/splash",
            name: "splash",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Splash.vue")
        },
        {
            path: "/lockscreen",
            name: "lockscreen",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Lock.vue")
        },
        {
            path: "/createteam",
            name: "createteam",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/CreateTeamForm.vue")
        },
        {
            path: "/editteam/:team_name/:formation",
            name: "editteam",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/EditTeamForm.vue")
        },
        {
            path: "/myteam",
            name: "myteam",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/MyTeam.vue")
        },
        {
            path: "/otherteam/:teamId",
            name: "otherteam",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/OtherTeam.vue")
        },
        {
            path: "/register",
            name: "register",
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Register.vue")
        },
        {
            path: "/settings",
            name: "settings",
            component: () =>
                import ("./views/Settings.vue")
        },
        {
            path: "/settings/account",
            name: "account",
            component: () =>
                import ("./views/Account.vue")
        },
        {
            path: "/settings/howtoplay",
            name: "howtoplay",
            component: () =>
                import ("./views/HowToPlay.vue")
        },
        {
            path: "/settings/faqs",
            name: "faqs",
            component: () =>
                import ("./views/Faqs.vue")
        },
        {
            path: "/settings/terms",
            name: "terms",
            component: () =>
                import ("./views/Terms.vue")
        },
        {
            path: "/settings/privacypolicy",
            name: "PrivacyPolicy",
            component: () =>
                import ("./views/PrivacyPolicy.vue")
        },
        {
            path: "/settings/cookies",
            name: "cookies",
            component: () =>
                import ("./views/Cookies.vue")
        },
        {
            path: "/overview",
            name: "overview",
            component: () =>
                import ("./views/Overview.vue")
        },
        {
            path: "/mytransfers/:positionfor",
            name: "mytransfers",
            component: () =>
                import ("./views/MyTransfers.vue")
        },
        {
            path: "/leagues",
            name: "leagues",
            component: () =>
                import ("./views/Leagues.vue")
        },
        {
            path: "/joinleague/:league_code",
            name: "joinleague",
            component: () =>
                import ("./views/JoinLeague.vue")
        },
        {
            path: "/joinleague",
            name: "joinleague",
            component: () =>
                import ("./views/JoinLeague.vue")
        },
        {
            path: "/createleague",
            name: "createleague",
            component: () =>
                import ("./views/CreateLeague.vue")
        },
        {
            path: "/allplayers/:positionfor",
            name: "allplayers",
            component: () =>
                import ("./views/AllPlayers.vue")
        },
        {
            path: "/transfermarket/:positionfor",
            name: "transfermarket",
            component: () =>
                import ("./views/TransferMarket.vue")
        },
        {
            path: "/buy-player/:positionfor/:playerId",
            name: "buyplayer",
            component: () =>
                import ("./views/BuyPlayer.vue")
        },
        {
            path: "/sell-player/:playerId",
            name: "sellplayer",
            component: () =>
                import ("./views/SellPlayer.vue")
        },
        {
            path: "/show-player/:positionfor/:playerId",
            name: "showplayer",
            component: () =>
                import ("./views/ShowPlayer.vue")
        },
        {
            path: "/league/:leagueId",
            name: "league",
            component: () =>
                import ("./views/PrivateLeague.vue")
        },
        // {
        //   path: '/versions/:pageId/:pageName',
        //   name: 'versions',
        //   // route level code-splitting
        //   // this generates a separate chunk (about.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import(/* webpackChunkName: "about" */ './views/Versions.vue')
        // },
        {
            path: "/comments/:versionId/:versionimage",
            name: "comments",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ "./views/Comments.vue")
        }
    ]
});