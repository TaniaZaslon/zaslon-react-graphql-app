export const setActive = (parentId, activeElement) => {
  const childrens = document.getElementById(parentId).children;
  
  [...childrens].forEach(element => element.classList.remove("active"));

  if(activeElement.nodeName !== "A") activeElement = activeElement.parentElement;
  activeElement.classList.add("active");
};