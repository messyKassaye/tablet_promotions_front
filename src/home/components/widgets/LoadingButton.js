import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Check from '@material-ui/icons/Check';
import ChevronRight from '@material-ui/icons/ChevronRight'

const LoadingButton = (props) => {
    const { loading, done,text,...other } = props;

    if (done) {
        return (
            <Button  {...other} disabled>
                <Check />
            </Button>
        );
    }
    else if (loading) {
        return (
            <Button  {...other}>
                 {text} <CircularProgress style={{height:20,width:20,marginLeft:5}}/>
            </Button>
        );
    } else {
        return (
            <Button  {...other}>
                {text}  <ChevronRight style={{marginLeft:5}}/>
            </Button>
        );
    }
}

LoadingButton.defaultProps = {
    loading: false,
    done: false,
};

LoadingButton.propTypes = {
    loading: PropTypes.bool,
    done: PropTypes.bool,
};

export default LoadingButton;