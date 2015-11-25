import Layout from 'components/layout';
import Login from 'components/login';

export default (rtnUrl) =>{
	ReactDOM.render(<Layout><Login returnUrl={rtnUrl} /></Layout>, document.body);
};