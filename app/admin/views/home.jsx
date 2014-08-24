define(['react', 'jsx!./_layout'], 

    function(React, Layout){


        var exports = React.createClass({

            render: function(){
                
                return (
                    <Layout>
                        <div></div>
                    </Layout>
                );
            }
        });

        return exports;

    }
);