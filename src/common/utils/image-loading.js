/**
 * function run onload if our image loaded else run onerror;
 * onload, onerror need to write in your component;
 * 
 * @param {string} imageUrl 
 * @param {func} onload 
 * @param {func} onerror 
 */

const imageLoading = (imageUrl, onload = () => {}, onerror = () => {}) => {
        let img = new Image();
        img.src = imageUrl;
        img.onload = () => img.height > 1 && onload();
        img.onerror = () => onerror();
};

export default imageLoading;