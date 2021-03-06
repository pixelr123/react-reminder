import React, { useRef, useState, useEffect } from "react";
import { PoseGroup } from "react-pose";
import { withTheme } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  Container,
  Overlay,
  PoseOverlay,
  PoseContent,
  LogoutButton,
  AvatarContainer,
  UsernameContainer,
  EmailContainer,
  ThemeContainer,
  NotificationsContainer,
  LanguageContainer
} from "./UserProfile.styles";
import { UserAvatar } from "../UserAvatar";
import { TextInput } from "../TextInput";
import { useSession } from "../../context/UserContext.js";
import { LanguageControl } from "../LanguageControl/index.js";
import { ThemeControl } from "../ThemeControl/index.js";

const UserProfile = ({ theme, isVisible, onClose }) => {
  const { t } = useTranslation();
  const overlayRef = useRef();
  const { user, signOut, updateUsername } = useSession();
  const [currentName, setCurrentName] = useState("");
  const [isEditName, setIsEditName] = useState(false);

  useEffect(() => {
    setCurrentName((user && user.displayName) || "");
  }, [user]);

  const onOverlayClick = e => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const onChangeUsername = value => {
    setIsEditName(true);
    setCurrentName(value);
  };

  const saveUsername = () => {
    if (user && currentName) {
      updateUsername(currentName);
    }
    setIsEditName(false);
  };

  return (
    <PoseGroup>
      {isVisible && (
        <PoseOverlay key="overlay">
          <Overlay ref={overlayRef} onClick={onOverlayClick}>
            <PoseContent key="content">
              <Container>
                <AvatarContainer>
                  <UserAvatar size={84} name={user.displayName}></UserAvatar>
                </AvatarContainer>
                <UsernameContainer>
                  <TextInput
                    value={currentName}
                    isEditMode={isEditName}
                    onChange={onChangeUsername}
                    onEnter={saveUsername}
                    onEscape={saveUsername}
                    onClickAway={saveUsername}
                  />
                </UsernameContainer>
                <EmailContainer>{user.email || ""}</EmailContainer>
                <LanguageContainer>
                  {t("languageLabel")}
                  <LanguageControl />
                </LanguageContainer>
                <ThemeContainer>
                  {t("darkThemeLabel")}
                  <ThemeControl />
                </ThemeContainer>
                <NotificationsContainer>
                  {t("pushNotificationsLabel")}
                  <ThemeControl></ThemeControl>
                </NotificationsContainer>
                <LogoutButton onClick={signOut}>
                  {t("logoutButton")}
                </LogoutButton>
              </Container>
            </PoseContent>
          </Overlay>
        </PoseOverlay>
      )}
    </PoseGroup>
  );
};

export default withTheme(UserProfile);
