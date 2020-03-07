import React, {Component} from 'react';
import {Card, CardContent, CardHeader} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import {grey} from "@material-ui/core/colors";
class UsersLoader extends Component {
    render() {
        return (
            <Card>
                <CardHeader
                 title={
                     <Skeleton
                         variant={"text"}
                         width={150}
                         style={{backgroundColor:grey[500]}}
                     />
                 }
                 subheader={<Skeleton
                     variant={"text"}
                     width={100}
                     style={{backgroundColor:grey[500]}}
                 />}
                 avatar={
                     <Skeleton
                         variant={"circle"}
                         width={40}
                         height={40}
                         style={{backgroundColor:grey[500]}}
                     />
                 }
                />
                <CardContent>
                    <Skeleton
                        variant={"text"}
                        width={'80%'}
                        style={{backgroundColor:grey[500],marginBottom:15}}
                    />

                    <Skeleton
                        variant={"text"}
                        width={'80%'}
                        style={{backgroundColor:grey[500],marginBottom:15}}
                    />

                    <Skeleton
                        variant={"text"}
                        width={'80%'}
                        style={{backgroundColor:grey[500]}}
                    />
                </CardContent>
            </Card>
        );
    }
}

export default UsersLoader;