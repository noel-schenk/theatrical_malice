import styled from 'styled-components';

export const MaskDescriptionWrapper = styled.div`
    div {
        display: flex;
        flex-direction: row;
        text-align: left;
        align-items: center;
        gap: 10px;
    }

    img {
        width: 48px;
        height: 48px;
        object-fit: cover;
        outline-offset: -5px;
        outline: 1px dashed black;
    }

    .flipped {
        transform: scaleX(-1);
    }

    .position {
        color: darkorange;
    }

    ul {
        margin-left: 48px;
    }
`;
