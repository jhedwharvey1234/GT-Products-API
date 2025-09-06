let comments = [
    { id: 1, text: 'comment ko', postId: 1 },
    { id: 2, text: 'comment mo', postId: 2 }
];
let nextId = 3;

export const getAllcomments = () => {
    return comments;
};
export const getcommentById = (id) => {
    return comments.find(c => c.id === id);
};
export const createcomment = (commentData) => {
    const newcomment = { id: nextId++, ...commentData };
    comments.push(newcomment);
    return newcomment;
};
export const updatecomment = (id, commentData) => {
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
        return null;
    }
    comments[commentIndex] = { ...comments[commentIndex], ...commentData };
    return comments[commentIndex];
};
export const deletecomment = (id) => {
    const commentIndex = comments.findIndex(c => c.id === id);  
    if (commentIndex === -1) {
        return false;
    }
    comments.splice(commentIndex, 1);
    return true;
};
export const patchcomment = (id, commentData) => {
    const commentIndex = comments.findIndex(c => c.id === id);
    if (commentIndex === -1) {
        return null;
    }
    comments[commentIndex] = { ...comments[commentIndex], ...commentData };
    return comments[commentIndex];
};
export const getCommentsByPostId = (postId) => {
    return comments.filter(c => c.postId === postId);
};



