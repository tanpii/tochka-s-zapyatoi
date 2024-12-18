export { authorizationSlice } from "./model/slice";
export {
    openAuthPopup,
    closeAuthPopup,
    setIsAuthorized,
    setIsLoading,
} from './model/slice';
export { getIsAuthPopupOpen } from './model/slice';
export { getIsAuthPopupLoading } from './model/slice';
export { getUserAuthorized } from './model/slice';

export { AuthPopup } from "./components/AuthPopup/AuthPopup";
