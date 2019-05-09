/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { resetState, updateState, onRequestDog } from '../actions';

const Title = styled.p`
    width: 100vw;
    text-align: center;
    margin-top: 10%;
    font-size: 26px;
`;

const StateContainer = styled.div`
    text-align: center;
`;

const DogContainer = styled.div`
    text-align: center;
`;

class HomeContainer extends React.Component {
    handleUpdateStateButton = () => {
        this.props.updateState('Me updated state !');
    }

    handleResetStateButton = () => {
        this.props.resetState();
    }

    handleDogGeneration = () => {
        this.props.onRequestDog();
    }

    render() {
        const {
            test, fetching, dog, error,
        } = this.props;
        return (
            <div>
                <Title>
                    Welcome to Possible Future’s Boilerplate!
                </Title>
                <StateContainer>
                    <button type="button" onClick={this.handleUpdateStateButton}>Update State</button>
                    <button type="button" onClick={this.handleResetStateButton}>Reset State</button>

                    <p>State value: {test}</p>
                </StateContainer>
                <DogContainer>
                    <img src={dog} alt="dog" />
                    {dog ? (
                        <p className="App-intro">Keep clicking for new dogs</p>
                    ) : (
                        <p className="App-intro">Generate a dog through Saga !</p>
                    )}

                    {fetching ? (
                        <button type="button" disabled>Fetching...</button>
                    ) : (
                        <button type="button" onClick={this.handleDogGeneration}>Request a Dog</button>
                    )}

                    {error && <p style={{ color: 'red' }}>Uh oh - something went wrong!</p>}
                </DogContainer>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    test: state.baseReducer.test,
    fetching: state.sagaReducer.fetching,
    dog: state.sagaReducer.dog,
    error: state.sagaReducer.error,
});

const mapDispatchToProps = dispatch => ({
    resetState: () => dispatch(resetState()),
    updateState: value => dispatch(updateState(value)),
    onRequestDog: () => dispatch(onRequestDog()),
});

HomeContainer.propTypes = {
    test: PropTypes.string.isRequired,
    updateState: PropTypes.func.isRequired,
    resetState: PropTypes.func.isRequired,
    onRequestDog: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
