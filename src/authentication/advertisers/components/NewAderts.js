import React from "react";
import {Card} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";
import newAdverts from "../styles/newAdertStyle";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import LoadingButton from "../../../home/components/widgets/LoadingButton";
import {fetchMediaType} from "../../state/actions/advertisementMediaTypeController";
import {fetchPlaces} from "../../state/actions/placesController";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import {translate} from "react-i18next";
import ReactDOM from 'react-dom'
import {withRouter} from 'react-router-dom'
import {storeAdvert} from "../state/action/advertAction";

class NewAderts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectOpened: false,
            selectValue: '',
            mediaTypeValue: '',
            isMediaSelected: false,
            placeValue: '',
            isPlaceSelected: false,
            fileName: '',
            showAllOver: false,
            acceptMediaType: '',
            uploadSucceed: false,
            formData: {
                "company_id": '',
                "advertisement_media_id": '',
                "place_id": '',
                "product_name": '',
                "required_views_number": '',
                "files": '',
                "is_all_over_ethiopia": 0
            },
            submitted: false,
            loading: false,
            finished: false,
        }
        this.handleSelect = this.handleSelect.bind(this)
        this.handleSelectOpen = this.handleSelectOpen.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleMediaSelect = this.handleMediaSelect.bind(this)
        this.handleMediaSelectOpen = this.handleMediaSelectOpen.bind(this)
        this.handleMediaSelectChange = this.handleMediaSelectChange.bind(this)

        this.handlePlace = this.handlePlace.bind(this)
        this.handlePlaceOpen = this.handlePlaceOpen.bind(this)
        this.handlePlaceChange = this.handlePlaceChange.bind(this)
        this.handleFile = this.handleFile.bind(this)

    }

    handleSelect = () => {
        this.setState({
            isSelectOpened: false
        })
    }

    handleSelectOpen = () => {
        this.setState({
            isSelectOpened: true
        })
    }

    handleSelectChange = (event) => {
        this.setState({
            selectValue: event.target.value
        })
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }

    handleMediaSelect = () => {
        this.setState({
            isMediaSelected: false
        })
    }

    handleMediaSelectOpen = () => {
        this.setState({
            isMediaSelected: true
        })
    }

    handleMediaSelectChange = (event) => {
        this.setState({
            mediaTypeValue: event.target.value,
        })

        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)

        let acceptValue = this.props.advertisementMediaType.filter(media => media.id === event.target.value);
        this.setState({
            acceptMediaType: acceptValue[0].name.toLowerCase()
        })
    }

    handlePlace = () => {
        this.setState({
            isPlaceSelected: false
        })
    }

    handlePlaceOpen = () => {
        this.setState({
            isPlaceSelected: true
        })
    }

    handlePlaceChange = (event) => {
        this.setState({
            placeValue: event.target.value
        })
        const {formData} = this.state
        formData[event.target.name] = event.target.value;
        this.setState(formData)
    }


    handleChange = (event) => {
        const {formData} = this.state
        formData[event.target.name] = event.target.value
        this.setState(formData)
    }

    handleSubmit = () => {
        this.setState({
            submitted: true,
            loading: true
        })
        const data = new FormData();
        data.append('file', this.state.formData.files);
        data.append('company_id', this.state.formData.company_id)
        data.append('advertisement_media_id', this.state.formData.advertisement_media_id)
        data.append('place_id', this.state.formData.place_id)
        data.append('product_name', this.state.formData.product_name)
        data.append('required_views_number', this.state.formData.required_views_number)
        data.append('is_all_over_ethiopia', this.state.formData.is_all_over_ethiopia)
        this.props.storeAdvert(data)
    }

    openFileDialog = () => {
        let fileInpuDom = ReactDOM.findDOMNode(this.refs.input);
        fileInpuDom.click()
    }
    handleFile = (event) => {
        this.setState({
            fileName: event.target.files[0].name
        })
        const {formData} = this.state
        formData[event.target.name] = event.target.files[0];
        this.setState(formData)
    }
    allOverEthiopia = () => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState(
            {
                showAllOver: !this.state.showAllOver
            }
        )
    }

    componentDidMount() {
        this.props.fetchMediaType()
        this.props.fetchPlaces()
    }
   componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.status){
            this.props.history.push('/bank_transaction')
        }
   }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.advert) {
            this.setState({
                loading: false,
                finished: false,
                submitted: false,
                uploadSucceed:true
            })
        }
    }



    render() {
        const {classes} = this.props
        const {formData} = this.state
        const {loading} = this.state;
        const finished = false
        const setLoading = !finished && loading;
        const isEnabled = formData.company_id > 0 && formData.advertisement_media_id > 0
            && formData.place_id > 0 && formData.required_views_number.length > 0
            && formData.files.size > 0 && formData.product_name.length > 0
        const {t} = this.props
        return (
            <div>
                <Card>
                    <CardHeader
                        className={classes.header}
                        title={t('advertiser.new_advert.title')}
                    />
                    <CardContent style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {
                            this.props.loading
                                ?
                                (
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <CircularProgress/>
                                    </div>
                                )
                                :
                                (
                                    <div className={classes.container}>
                                                    <ValidatorForm
                                                        className={classes.form}
                                                        onSubmit={this.handleSubmit}
                                                    >
                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel
                                                                htmlFor="demo-controlled-open-select">{t('advertiser.new_advert.form.select_company')}</InputLabel>
                                                            <Select
                                                                name='company_id'
                                                                value={this.state.selectValue}
                                                                open={this.state.isSelectOpened}
                                                                onClose={this.handleSelect}
                                                                onOpen={this.handleSelectOpen}
                                                                onChange={this.handleSelectChange}
                                                            >
                                                                {
                                                                    this.props.user.map(items => items.relations.companies.map(company => (
                                                                        <MenuItem key={company.name}
                                                                                  value={company.id}>{company.name}</MenuItem>
                                                                    )))
                                                                }
                                                            </Select>
                                                        </FormControl>

                                                        <FormControl className={classes.formControl}>
                                                            <InputLabel
                                                                htmlFor="demo-controlled-open-select">{t('advertiser.new_advert.form.select_media_type')}</InputLabel>
                                                            <Select
                                                                name='advertisement_media_id'
                                                                value={this.state.mediaTypeValue}
                                                                open={this.state.isMediaSelected}
                                                                onClose={this.handleMediaSelect}
                                                                onOpen={this.handleMediaSelectOpen}
                                                                onChange={this.handleMediaSelectChange}
                                                            >
                                                                {
                                                                    this.props.advertisementMediaType.map(items => (
                                                                        <MenuItem key={items.name} value={items.id}
                                                                                  name={items.name}>{items.name}</MenuItem>
                                                                    ))
                                                                }
                                                            </Select>
                                                        </FormControl>

                                                        <Grid container>
                                                            <Grid item md={8} xs={12}>
                                                                {
                                                                    this.state.showAllOver
                                                                        ?
                                                                        (
                                                                            <div style={{
                                                                                display: 'flex',
                                                                                justifyContent: 'start',
                                                                                alignItems: 'flex-end',
                                                                                marginTop: 25
                                                                            }}>
                                                                                <Typography color='textSecondary'
                                                                                            variant='h6'>
                                                                                    {t('advertiser.new_advert.form.advertisement_place')}
                                                                                </Typography>
                                                                            </div>
                                                                        )

                                                                        :
                                                                        (
                                                                            <FormControl
                                                                                className={classes.formControl}>
                                                                                <InputLabel
                                                                                    htmlFor="demo-controlled-open">{t('advertiser.new_advert.form.select_place')}</InputLabel>
                                                                                <Select
                                                                                    name='place_id'
                                                                                    value={this.state.placeValue}
                                                                                    open={this.state.isPlaceSelected}
                                                                                    onClose={this.handlePlace}
                                                                                    onOpen={this.handlePlaceOpen}
                                                                                    onChange={this.handlePlaceChange}
                                                                                >
                                                                                    {
                                                                                        this.props.places.map(items => (
                                                                                            <MenuItem key={items.city}
                                                                                                      value={items.id}>{items.city}</MenuItem>
                                                                                        ))
                                                                                    }
                                                                                </Select>
                                                                            </FormControl>
                                                                        )
                                                                }
                                                            </Grid>

                                                            <Grid item md={4} xs={12}>
                                                                <div className={classes.button}>
                                                                    {
                                                                        this.state.showAllOver
                                                                            ?
                                                                            (
                                                                                <Button
                                                                                    onClick={this.allOverEthiopia()}
                                                                                    color='secondary'
                                                                                    variant='outlined'>
                                                                                    {t('advertiser.new_advert.form.back_to_select_place')}
                                                                                </Button>
                                                                            )
                                                                            :
                                                                            (
                                                                                <Button
                                                                                    variant='outlined'
                                                                                    color='secondary'
                                                                                    onClick={this.allOverEthiopia()}
                                                                                >
                                                                                    {
                                                                                        t('advertiser.new_advert.form.all_over_ethiopia')
                                                                                    }
                                                                                </Button>
                                                                            )
                                                                    }
                                                                </div>
                                                            </Grid>
                                                        </Grid>

                                                        <TextValidator
                                                            className={classes.formControl}
                                                            label={t('advertiser.new_advert.form.product_name')}
                                                            onChange={this.handleChange}
                                                            name="product_name"
                                                            value={this.state.formData.product_name}
                                                            validators={['required']}
                                                            errorMessages={['Please add your plate number']}
                                                        />

                                                        <TextValidator
                                                            className={classes.formControl}
                                                            label={t('advertiser.new_advert.form.number_of_views')}
                                                            onChange={this.handleChange}
                                                            name="required_views_number"
                                                            value={this.state.formData.required_views_number}
                                                            validators={['required']}
                                                            helperText={t('advertiser.new_advert.form.minimum_views')}
                                                            errorMessages={['Please add your plate number']}
                                                        />


                                                        <Grid container style={{marginTop: 30, marginBottom: 20}}>
                                                            <Grid item md={8} xs={12}>
                                                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                                                    <Typography>
                                                                        {t('advertiser.new_advert.form.file_preparation')}
                                                                    </Typography>
                                                                    {
                                                                        this.state.fileName !== ''
                                                                            ?
                                                                            (
                                                                                <Typography>{`${t('advertiser.new_advert.form.select_file')}${this.state.fileName}`}</Typography>
                                                                            )
                                                                            : ''
                                                                    }
                                                                </div>
                                                            </Grid>

                                                            <Grid item md={4} xs={12}>
                                                                <input
                                                                    type='file'
                                                                    multiple={false}
                                                                    name='files'
                                                                    ref='input'
                                                                    style={{display: 'none'}}
                                                                    accept={`${this.state.acceptMediaType}/*`}
                                                                    onChange={this.handleFile}/>
                                                                <Button
                                                                    onClick={this.openFileDialog.bind(this)}
                                                                    color='secondary'
                                                                    variant='outlined'>
                                                                    {t('advertiser.new_advert.form.upload')}
                                                                </Button>
                                                            </Grid>
                                                        </Grid>

                                                        <div style={{
                                                            display: 'flex',
                                                            width: '100%',
                                                            justifyContent: 'flex-end',
                                                            alignItems: 'end'
                                                        }}>
                                                            <LoadingButton
                                                                style={{textTransform: 'capitalize'}}
                                                                color="primary"
                                                                variant="contained"
                                                                type="submit"
                                                                disabled={!isEnabled || this.state.submitted}
                                                                loading={setLoading}
                                                                done={finished}
                                                                text={t('advertiser.new_advert.form.send_advert')}>
                                                            </LoadingButton>
                                                        </div>
                                                    </ValidatorForm>
                                    </div>
                                )
                        }
                    </CardContent>
                </Card>
            </div>
        );
    }


}

const mapStateToProps = state => (
    {
        user: state.userData.user,
        loading: state.userData.loading,
        advertisementMediaType: state.authReducer.advertisementMediaType.mediaTypes,
        mediaLoading: state.authReducer.advertisementMediaType.loading,
        places: state.authReducer.placeReducer.places,
        advert: state.authReducer.advertiserReducer.advert,
        status:state.authReducer.advertiserReducer.status

    }
)

export default withStyles(newAdverts)
(translate('common')(connect(mapStateToProps, {fetchMediaType, fetchPlaces, storeAdvert})(withRouter(NewAderts))))