define(['react', 'jsx!./_layout', 'jsx!views/post'],
    function(React, Layout, Post){
        
        var exports = React.createClass({
            
            render: function(){
                return (
                    <Layout>
                        {this.transferPropsTo(<Post />)}
                    </Layout>
                );
            }
        });
        
        return exports;
    });