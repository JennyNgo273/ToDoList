import styled from 'styled-components';


export const Container = styled.div`

    width: 100%
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    color: ${props => props.theme.color};
    border: 3px solid ${props=>props.theme.borderColor};

 `