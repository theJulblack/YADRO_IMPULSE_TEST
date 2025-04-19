export const validateTaskTitle = (title: string): boolean => {
    return title.trim().length >= 3;
  };
  
  export const validateDueDate = (date: Date | undefined): boolean => {
    if (!date) return true;
    return date >= new Date();
  };