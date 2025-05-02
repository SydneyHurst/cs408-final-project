export function rollItems(isSick) {
    const count = Math.floor(Math.random() * 3) + 1;
    const results = [];
  
    for (let i = 0; i < count; i++) {
      const raw = Math.floor(Math.random() * 100) + 1;
      const adjusted = isSick ? Math.max(1, raw - 10) : raw;
      const rarity =
        adjusted <= 50 ? "Common" : adjusted <= 80 ? "Uncommon" : "Rare";
  
      results.push({ raw, adjusted, rarity });
    }
  
    return results;
  }
  