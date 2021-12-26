import {
  BiPlus,
  BiHome,
  BiCamera,
  BiAlarm,
  BiMap,
  BiCog,
} from "react-icons/bi";
import styled from "@emotion/styled";
import { useCallback, useEffect, useRef, useState } from "react";

interface MenuButtonProps {
  iconNode: React.ReactElement;
  toggleMenu: () => void;
  isOpen: boolean;
}

interface StyledMenuButtonProps {
  isOpen: boolean;
}

interface MenuItemProps {
  iconNode: React.ReactElement;
  deg: number;
  isOpen?: boolean;
}

interface StyledMenuItemProps {
  deg: number;
  isOpen?: boolean;
}
// body 要加overflow hidden
const NavContainer = styled.nav`
  position: absolute;
  background-color: red;

  top: 300px;
  right: 0px;
  width: 80px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* drag */
  cursor: grab;
`;
const NavContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* 120 translateY *2 + height60px */
  transform: rotate(-45deg);
`;

const StyledMenuButton = styled.div<StyledMenuButtonProps>`
  width: 60px;
  height: 60px;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  z-index: 100;
  cursor: pointer;
  transform: ${(props) => !props.isOpen && "rotate(-225deg)"};
  transition: all 0.5s ease;
  & svg {
    font-size: 35px;
    color: #0e2431;
  }
`;

// menuItem is absolute and menuButton is same degree with menuItem, so it will overlap
// rotate 圓心在中間 center
const StyledMenuItem = styled.span<StyledMenuItemProps>`
  position: absolute;
  transform: ${(props) =>
    props.isOpen && `rotate(${(props.deg * 360) / 8}deg) translateY(120px)`};
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  transition: all 0.5s ease;
`;

const StyledIcon = styled.a<StyledMenuItemProps>`
  width: 60px;
  height: 60px;
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 0 rgba(0, 0, 0, 0.2);
  text-decoration: none;
  transform: rotate(${(props) => ((props.deg - 1) * 360) / -8}deg);
  & > svg {
    font-size: 24px;
    color: #0e2431;
    opacity: 0.8;
    transition: 0.2s;
    &:hover {
      opacity: 1;
    }
  }
`;

const MenuButton: React.FC<MenuButtonProps> = ({
  iconNode,
  toggleMenu,
  isOpen,
}) => {
  return (
    <StyledMenuButton isOpen={isOpen} onClick={toggleMenu}>
      {iconNode}
    </StyledMenuButton>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ iconNode, deg, isOpen }) => {
  return (
    <StyledMenuItem isOpen={isOpen} deg={deg} as="span">
      <StyledIcon deg={deg} href="#">
        {iconNode}
      </StyledIcon>
    </StyledMenuItem>
  );
};

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const onDrag = useCallback(({ movementY }) => {
    // movementY gets mouse vertical value
    console.log("callback");
    if (navRef.current) {
      const navStyle = window.getComputedStyle(navRef.current), // getting all css style of nav
        navTop = parseInt(navStyle.top), // getting nav top value
        navHeight = parseInt(navStyle.height), // getting nav height value & convert it int
        windowHeight = window.innerHeight;
      navRef.current.style.top = navTop > 0 ? `${navTop + movementY}px` : "1px";
      if (navTop > windowHeight - navHeight) {
        navRef.current.style.top = `${windowHeight - navHeight}px`;
      }
    }
  }, []);

  const handleAddEventOnDrag = useCallback(() => {
    navRef.current?.addEventListener("mousemove", onDrag);
  }, []);

  const handleRemoveEventOnDrag = useCallback(() => {
    navRef.current?.removeEventListener("mousemove", onDrag);
  }, []);

  useEffect(() => {
    navRef.current?.addEventListener("mousedown", handleAddEventOnDrag);
    navRef.current?.addEventListener("mouseup", handleRemoveEventOnDrag);
    navRef.current?.addEventListener("mouseleave", handleRemoveEventOnDrag);
    return () => {
      navRef.current?.removeEventListener("mousedown", handleAddEventOnDrag);
      navRef.current?.removeEventListener("mouseup", handleRemoveEventOnDrag);
      navRef.current?.removeEventListener(
        "mouseleave",
        handleRemoveEventOnDrag
      );
    };
  }, []);
  return (
    <NavContainer ref={navRef}>
      <NavContent>
        <MenuButton
          isOpen={isOpen}
          toggleMenu={toggleMenu}
          iconNode={<BiPlus />}
        />
        <MenuItem isOpen={isOpen} deg={1} iconNode={<BiHome />} />
        <MenuItem isOpen={isOpen} deg={2} iconNode={<BiCamera />} />
        <MenuItem isOpen={isOpen} deg={3} iconNode={<BiAlarm />} />
        <MenuItem isOpen={isOpen} deg={4} iconNode={<BiMap />} />
        <MenuItem isOpen={isOpen} deg={5} iconNode={<BiCog />} />
      </NavContent>
    </NavContainer>
  );
};
