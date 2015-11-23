import Layout from 'components/layout';
import PostCollection from 'components/post/collection';
import PostList from 'components/post/list';

export function render(){
		ReactDOM.render(<Layout><PostList type="home"/></Layout>, document.body);
};

