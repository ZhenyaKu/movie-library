import './header.scss';
import { Link } from 'react-router-dom';
import user from '../../images/user.png';
import { useState, forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Snackbar from '@mui/material/Snackbar';
import SearchIcon from '@mui/icons-material/Search';

import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 1
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [term, setTerm] = useState("");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (term === "") return setOpen(true);

        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm("")
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            submitHandler(e)
        }
    }
    return (
        <div className={isScrolled ? "header scrolled" : "header"}>
            <div className="container">
                <div className="left">
                    <span>
                        <Link to="/" className="logo">FILMIX</Link>
                    </span>
                    <span><Link to="/" className="link">Homepage</Link></span>
                    <span>Movies</span>
                    <span>Shows</span>
                </div>
                <div className="right">
                    <Search>
                        <SearchIconWrapper onClick={submitHandler} >
                            <SearchIcon style={{ cursor: 'pointer' }} />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            type="text"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    </Search>
                    <div className="userImage">
                        <img src={user} alt="user" />
                    </div>
                </div>
            </div>


            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={() => setOpen(false)}
                autoHideDuration={2000}
            >
                <Alert severity="info" sx={{ width: '100%' }}>
                    Provide a search term!
                </Alert>
            </Snackbar>
        </div >
    );
}
