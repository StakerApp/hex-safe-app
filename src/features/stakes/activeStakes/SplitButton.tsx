import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import ToolTip from '@mui/material/Tooltip';
import { Fragment, useRef, useState } from 'react';

type Props = {
    endStakeHandler: () => void,
    goodAccountingHandler: () => void
    stakePending: boolean
    stakeDue: boolean
    stakeAccounted: boolean
    stakeLate: boolean
}

const options = ['End Stake', 'Good Accounting'];

export const SplitButton = ({ endStakeHandler, goodAccountingHandler, stakePending, stakeDue, stakeAccounted, stakeLate }: Props) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);

    const handleMenuItemClick = (
        index: number,
    ) => {
        if (index === 0) {
            endStakeHandler();
        } else if (index === 1) {
            goodAccountingHandler();
        }
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    const buttonColor: () => 'error' | 'primary' | 'secondary' | 'warning' = () => {
        if (stakePending) {
            return 'secondary';
        } else if (stakeDue) {
            return 'primary';
        } else if (stakeLate) {
            return 'warning';
        } else {
            return 'error';
        }
    };

    return (
        <Fragment>
            <ToolTip title={(stakePending ? 'Stake is pending...' : '')}>

                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button color={buttonColor()} onClick={endStakeHandler}>{!stakePending && options[0]}{stakePending && 'cancel'}</Button>
                    {!stakePending && <Button color={buttonColor()} size="small" onClick={handleToggle} disabled={stakePending}>
                        <ArrowDropDownIcon />
                    </Button>}
                </ButtonGroup>
            </ToolTip>
            <Popper
                sx={{
                    zIndex: 100,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            disabled={(index === 1) && (!stakeDue || stakeAccounted)}
                                            onClick={() => handleMenuItemClick(index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    );
};

export default SplitButton;
