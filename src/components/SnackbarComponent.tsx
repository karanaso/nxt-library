import { Snackbar } from "@mui/material"
import { atom, useRecoilState } from "recoil";

export const SnackBarState = atom({
  key: 'SnackBarState', // unique ID (with respect to other atoms/selectors)
  default: {
    text: '',
    type: 'success'
  }, // default value (aka initial value)
});

export const SnackbarComponent = () => {
  const [message, setMessage] = useRecoilState(SnackBarState);

  return (
    message.text ? <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={true}
      autoHideDuration={6000}
      onClose={() => setMessage({ ...message, text: '' })}
      message={message.text}
      style={{
        backgroundColor: message.type === 'success' ? 'green' : 'red'
      }}
    /> : <></>
  )
}