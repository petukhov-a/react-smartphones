export const handleOutsideClick = (
    event: MouseEvent,
    setIsShow: (iShow: boolean) => void,
    element: HTMLElement | null,
    btn?: HTMLElement | null
    ) => {
      
      if (btn !== undefined) {
        if (element && !event.composedPath().includes(element) &&
            btn && !event.composedPath().includes(btn)) {
          setIsShow(false);
        }
      } else {
        if (element && !event.composedPath().includes(element)) {
          setIsShow(false);
        }
      }
    }