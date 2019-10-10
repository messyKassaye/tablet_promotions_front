import React from "react";
import Grid from "@material-ui/core/Grid";
import Avatar from "react-avatar-edit";
class Setting extends React.Component{

    constructor(props) {
        super(props);
        const src = ''
        this.state = {
            preview: null,
            src
        }
        this.onCrop = this.onCrop.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
    }

    onClose() {
        this.setState({preview: null})
    }

    onCrop(preview) {
        this.setState({preview})
    }

    onBeforeFileLoad(elem) {
        if(elem.target.files[0].size > 71680){
            alert("File is too big!");
            elem.target.value = "";
        };
    }

    render() {
        return (
            <Grid container spacing={2}>
                <Grid item md={4} sm={12}>
                    <div>
                        <span>Change your profile picture</span>
                        <Avatar
                            width={390}
                            height={295}
                            onCrop={this.onCrop}
                            onClose={this.onClose}
                            onBeforeFileLoad={this.onBeforeFileLoad}
                            src={this.state.src}
                        />
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:10}}>
                            {
                                this.state.preview===null
                                ?
                                    (<span>Preview</span>)
                                :
                                    (
                                        <img src={this.state.preview} alt="Preview" />
                                    )
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item md={8} sm={12}>
                    Setting
                </Grid>
            </Grid>
        );
    }


}

export default Setting