export function calculateExp(options) {
    const { isCharacter, isBackground, isActivity, isOwner } = options;
  
    if (isCharacter && isBackground) {
      throw new Error("Cannot select both character and background.");
    }
  
    let exp = 0;
    if (isCharacter) exp += 1;
    if (isBackground) exp += 3;
    if (isActivity) exp += 2;
    if (isOwner) exp += 2;
  
    return exp;
  }
  