import styled from 'styled-components';

const StyledPlanMode = styled.div``;
const Wrapper = styled.div`
    ul {
        width: 50px;
        overflow: hidden;
    }
    .tab-button-list:hover {
        width: 250px;
        overflow: visible;
        background-color: white;
        transition: width 0.6s;
        position: relative;
        z-index: 1000;
        .title {
            opacity: 1;
            transition: opacity 0.6s 0s;
        }
    }
    li:hover {
        background-color: blue;
        .title {
            color: white;
        }
    }
    li {
        width: 100%;
        .nav-link {
            width: fit-content;
            padding-left: 10px;
            padding-right: 10px;
            padding-top: 0;
            padding-bottom: 0;
            border-radius: 0;
        }
    }
    .plan-mode-wrapper {
        display: flex;
    }
    .plan-mode {
        display: flex;
        align-items: center;
        img {
            max-width: 30px;
        }
        .title {
            color: blue;
            margin-left: 20px;
            padding: 20px;
            opacity: 0;
        }
    }
`;
export default {
    Wrapper,
    StyledPlanMode,
};
