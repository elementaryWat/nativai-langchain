import React from 'react';
import {theme} from '../../utils/MUITheme';

interface Props {
    onClick: () => void;
}




const BtnNewChat: React.FC<Props> = ({ onClick }) => {
    return (
        <button onClick={onClick} style={{backgroundColor:theme.palette.secondary.light,padding:'2rem', borderRadius:'10px',border:'none',position:'absolute',bottom:'60px',right:'40px',fontSize:'18px',boxShadow:'0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
            <span style={{ }}>+</span>
        </button>
    );
};

export default BtnNewChat;
