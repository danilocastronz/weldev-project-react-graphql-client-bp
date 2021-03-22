// icons
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/CodeRounded';
import CurrencyIcon from '@material-ui/icons/EuroRounded';
import AboutIcon from '@material-ui/icons/InfoOutlined';

// components
import Home from '../pages/Home';
import Currency from '../pages/GraphQLApi/Currency';
import About from '../pages/About';

// interface
import RouteItem from '../model/RouteItem.model';

// define app routes
const routes: Array<RouteItem> = [
    {
        menuId: "router-home",
        title: "Home",
        tooltip: "Home",
        path: "/",
        enabled: true,
        component: Home,
        icon: HomeIcon,
        appendDivider: true
    },
    {
        menuId: "router-graphql-api",
        title: "GraphQL API",
        tooltip: "GraphQL API Examples",
        enabled: true,
        icon: CodeIcon,
        appendDivider: true,
        subRoutes: [
            {
                menuId: "router-graphql-api-currency",
                title: "Currency",
                tooltip: "API Example",
                path: "/graphqlapi/currency",
                enabled: true,
                component: Currency,
                icon: CurrencyIcon
            }
        ]
    },
    {
        menuId: "router-about",
        title: "About",
        tooltip: "About",
        path: "/about",
        enabled: true,
        component: About,
        icon: AboutIcon
    },
];

export default routes;