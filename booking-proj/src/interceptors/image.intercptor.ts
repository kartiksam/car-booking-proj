import { diskStorage } from 'multer';
import * as  path from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerStorage = diskStorage({
    destination: './avatars', // You can also make this dynamic if needed
    filename: (req, file, cb) => {
        const name = path.parse(file.originalname).name.replace(/\s/g, '');
        const extension = path.extname(file.originalname);
        const uniqueName = `${name}-${uuidv4()}${extension}`;
        cb(null, uniqueName);
    }
}); 