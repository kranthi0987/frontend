import React from 'react';
import { Switch } from 'react-router';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import history from 'main/history';
import { Helmet } from 'react-helmet';
import withSegmentTracker from './middlewares/with_segment_tracker';
import withErrorBoundary from './middlewares/WithErrorBoundary';
import Home from './../scenes/home/home';
import EarnMoney from './../scenes/earn-money';
import TokenSale from './../scenes/token-sale';
import UserVerification from '../scenes/user-verification';
import CookiePolicy from './../scenes/cookie-policy';
import Account from './../scenes/account/account';
import Sessions from './../scenes/sessions/sessions';
import Results from './../scenes/results/results';
import Trip from './../scenes/trip';
import TripCreator from './../scenes/trip-creator';
import TripOrganizer from './../scenes/trip-organizer';
import TripShare from './../scenes/trip-share';
import Users from './../scenes/users/users';
import Services from './../scenes/services/services';
import Registrations from './../scenes/registrations/registrations';
import Notfound from './../styled_scenes/NotFound';
import ScrollToTop from './middlewares/ScrollToTop';
import ServiceUpsert from '../scenes/service-upsert';
import Checkout from '../scenes/checkout';
import PrivateRoute from './PrivateRoute';
import { getCurrentUser } from '../scenes/sessions/actions';
import GDPRNotification from './GDPRNotification';
import pleaseImg from 'assets/please-travel-plan-trip.jpg';
import { websiteUrl } from 'libs/config';

const commonHOCs = comp => withErrorBoundary(withSegmentTracker(comp));

class App extends React.Component {
  componentDidMount() {
    getCurrentUser()(store.dispatch);
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <Helmet>
            <title>Please.com</title>
            <meta
              name="description"
              content="Customize and book end-to-end trips planned by locals and frequent travelers"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={websiteUrl} />
            <meta property="og:title" content="Please, plan my trip!" />
            <meta property="og:site_name" content="Please" />
            <meta
              property="og:description"
              content="Customize and book end-to-end trips planned by locals and frequent travelers"
            />
            <meta property="og:image" content={`${websiteUrl}${pleaseImg}`} />
            <meta property="og:video" content="https://www.youtube.com/watch?v=LOzteotPJbw" />
            <meta property="twitter:site" content="@PleaseTrips" />
            <meta property="twitter:creator" content="@RomainBarissat" />
            <meta
              property="twitter:image:alt"
              content="Find the perfect trip organized by locals"
            />
          </Helmet>
          <Router history={history}>
            <ScrollToTop>
              <Switch>
                <Route exact path={process.env.PUBLIC_URL + '/'} component={commonHOCs(Home)} />
                <Route path={process.env.PUBLIC_URL + '/login'} component={commonHOCs(Sessions)} />
                <Route
                  path={process.env.PUBLIC_URL + '/user-verification'}
                  component={commonHOCs(UserVerification)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/register'}
                  component={commonHOCs(Registrations)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/earn-money'}
                  component={commonHOCs(EarnMoney)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/token-sale'}
                  component={commonHOCs(TokenSale)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/token-sale/smart-contract'}
                  component={commonHOCs(TokenSale)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/cookie-policy'}
                  component={commonHOCs(CookiePolicy)}
                />
                <Route path={process.env.PUBLIC_URL + '/results'} component={commonHOCs(Results)} />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + '/services/new'}
                  component={commonHOCs(ServiceUpsert)}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + '/services/edit/:id'}
                  component={commonHOCs(ServiceUpsert)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/services/:slug?_:id'}
                  component={commonHOCs(Services)}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + '/trips/organize/:id'}
                  component={commonHOCs(TripOrganizer)}
                  message="Please login or register to continue with your trip."
                />
                <Route
                  path={process.env.PUBLIC_URL + '/trips/organize'}
                  component={commonHOCs(TripOrganizer)}
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + '/trips/share/:id'}
                  component={commonHOCs(TripShare)}
                  message="Please login or register to share your trip."
                />
                <PrivateRoute
                  path={process.env.PUBLIC_URL + '/trips/checkout/:id'}
                  component={commonHOCs(Checkout)}
                  message="Please login or register to checkout your trip."
                />
                <Route
                  path={process.env.PUBLIC_URL + '/trips/create'}
                  component={commonHOCs(TripCreator)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/trips/:slug?_:id'}
                  component={commonHOCs(Trip)}
                />
                <Route
                  path={process.env.PUBLIC_URL + '/users/:userName'}
                  component={commonHOCs(Users)}
                />
                <Route path={process.env.PUBLIC_URL + '/account'} component={commonHOCs(Account)} />
                <Route component={withErrorBoundary(Notfound)} />
              </Switch>
            </ScrollToTop>
          </Router>
          <GDPRNotification />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
