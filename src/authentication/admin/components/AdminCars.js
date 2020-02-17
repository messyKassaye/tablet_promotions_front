import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add'
import {
    Card, CardContent, CardHeader, Container, IconButton, Divider
    , Grid, Button, Typography, CardActions, GridList
} from "@material-ui/core";
import {showMainDialog} from "../state/action/dialogAction";
import {connect} from "react-redux";
import AddNewCarCategory from "../dialogs/component/AddNewCarCategory";
import FourByFourSkeleton from "../../commons/loading/customSkeleton";
import {fetchCarCategory} from "../state/action/carCategoryAction";
import {deepOrange, green} from "@material-ui/core/colors";
import DeleteMessage from "../dialogs/component/DeleteMessage";
import withStyles from "@material-ui/core/styles/withStyles";
import adminCarStyle from "./styles/adminCarStyle";
import AddChildCategory from "../dialogs/component/AddChildCategory";
import ChildCarCategory from "./ChildCarCategory";
class AdminCars extends Component {

    addNewCarCategory = (component,title)=>{
        this.props.showMainDialog({'show':true,'page':component,'title':title,actions:{on:false,path:'',id:''}})
    }

    handleButtonClicks = (component,title,action)=>{
        this.props.showMainDialog({'show':true,'page':component,'title':title,actions:action})
    }
    componentDidMount() {
        this.props.fetchCarCategory()
    }

    render() {
        const {classes} = this.props
        return (
            <Container maxWidth='lg'>
                <Card>
                    <CardHeader
                     title='Cars'
                     action={
                         <IconButton color='inherit' onClick={()=>this.addNewCarCategory(<AddNewCarCategory form={{type:'form',data:null}}/>,'Add new car category')}>
                             <AddIcon/>
                         </IconButton>
                     }
                    />
                    <Divider/>
                    <CardContent>
                        <Grid container spacing={2}>
                            {
                                this.props.loading
                                    ?
                                    (
                                        <FourByFourSkeleton/>
                                    )
                                    :
                                    (
                                        this.props.categories.length>0
                                            ?
                                            (
                                                this.props.categories.map(items=>(
                                                   <Grid key={items.id} item md={6} xs={12}>
                                                       <Card style={{backgroundColor:green[500]}}>
                                                           <CardHeader
                                                            title={items.name}
                                                            style={{color:'white'}}
                                                            action={
                                                                <div>
                                                                    <Button
                                                                        onClick={()=>this.handleButtonClicks(
                                                                            <AddChildCategory category={items}/>,
                                                                            `Add new category for ${items.name}`,
                                                                            {on:false,path:'',id:''}
                                                                        )}
                                                                        color={"inherit"}
                                                                        size='small'
                                                                        style={{textTransform:'none'}}
                                                                        variant='outlined'>
                                                                        Add category
                                                                    </Button>
                                                                </div>
                                                            }
                                                           />
                                                           <Divider/>
                                                           <CardContent>
                                                               <GridList className={classes.gridList}>
                                                                   {
                                                                    items.child.map(child=>(
                                                                        <ChildCarCategory key={child.id} category={child}/>
                                                                    ))
                                                                   }
                                                               </GridList>

                                                           </CardContent>
                                                           <CardActions style={{display:'flex',
                                                               color:'white',
                                                               justifyContent:'flex-end',
                                                               alignItems:'center'}}>
                                                               <Button
                                                                   variant='text'
                                                                   color='inherit'
                                                                   onClick={()=>this.handleButtonClicks(
                                                                       <DeleteMessage message={`Are you sure you want to delete car category ${items.name}`} />,'Confirmation',{on:true,path:'categories',id:items.id})}
                                                                   style={{textTransform:'none'}}>
                                                                   Remove
                                                               </Button>
                                                               <Button
                                                                   variant='outlined'
                                                                   color='inherit'
                                                                   onClick={()=>this.handleButtonClicks(
                                                                       <AddNewCarCategory form={{type:'Edit',data:items}}/>,'Editing car category',
                                                                       {on:false,path:'',id:''})}
                                                                   style={{textTransform:'none'}}>
                                                                   Edit
                                                               </Button>
                                                           </CardActions>
                                                       </Card>
                                                   </Grid>
                                                ))
                                            )
                                            :
                                            (
                                                <div style={{textAlign:'center'}}>
                                                    <Typography>There is no registered car category</Typography>
                                                </div>
                                            )
                                    )
                            }
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        );
    }
}
const  mapStatToProps = state=>({
    categories:state.authReducer.adminReducers.categoryReducer.category,
    loading:state.authReducer.adminReducers.categoryReducer.loading
})


export default connect(mapStatToProps,{showMainDialog,fetchCarCategory})
(withStyles(adminCarStyle)(AdminCars));
