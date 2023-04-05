import { showNotification } from "@mantine/notifications";
import { Alert } from "@mantine/core";

export default function useNotification() {
    function showErrorNotification(message: string) {
        const messageOutput = message ? message : "An error has occurred.";
        console.log(messageOutput)
        showNotification({
        title: "Error",
        message: messageOutput,
        color: "red",
        autoClose: 3000,
        });
    }

    function showSuccessNotification(message: string) {
    const messageOutput = message ? message : "Operation success.";
    console.log(messageOutput)
    showNotification({
      title: "Success",
      message: messageOutput,
      color: "green",
      autoClose: 3000,
    });
    }

    function showModulableNotification(title: string, message: string, color: string, autoClose: boolean|number) {
      showNotification({
        title: title,
        message: message,
        color: color,
        autoClose: autoClose,
      });
    }
  

  return { showErrorNotification, showSuccessNotification, showModulableNotification };
}