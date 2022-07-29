import del from "del";

// Configuration
import { path } from "../config/path.js";

// Remove dist folder
const clear = () => {
    return del(path.root);
};

export { clear };