import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import styles

// Create and configure the Notyf instance
const Toast = new Notyf({
    duration: 3000,  // Duration of the notification in milliseconds
    position: {
        x: 'right',  // Horizontal position (left | center | right)
        y: 'top',    // Vertical position (top | center | bottom)
    }
});

export default Toast;
