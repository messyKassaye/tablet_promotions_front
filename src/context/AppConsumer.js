import React from "react";
import AuthenticationContext from "./AuthenticationContext";

const AppConsumer = Child => (
    class extends React.Component {
        render() {
            return (
                <AuthenticationContext.Consumer>
                    {(contextValues) => (
                        <Child navigate={contextValues.navigate} go={contextValues.go} {...this.props} />
                    )}
                </AuthenticationContext.Consumer>
            );
        }
    }
);

export default AppConsumer;