/**
 * Format anime score to 1 decimal point with proper rounding
 * @param score - The anime score (usually 0-10)
 * @returns Formatted score string with 1 decimal point, or 'N/A' if score is null/undefined
 */
export function formatAnimeScore(score: number | null | undefined): string {
  if (score === null || score === undefined) {
    return "N/A";
  }

  // Round to 1 decimal place
  // JavaScript's toFixed already rounds properly (>= 0.5 rounds up)
  return score.toFixed(1);
}

/**
 * Format member count to shortened format (K, M)
 * @param members - The number of members
 * @returns Formatted member count string
 */
export function formatMembers(members: number | null | undefined): string {
  if (!members) return "N/A";
  if (members >= 1000000) return `${(members / 1000000).toFixed(1)}M`;
  if (members >= 1000) return `${(members / 1000).toFixed(1)}K`;
  return members.toString();
}

/**
 * Format anime metadata (episodes and year)
 * @param episodes - Number of episodes
 * @param year - Release year
 * @returns Formatted metadata string with bullet separator
 */
export function formatMetadata(
  episodes: number | null,
  year: number | null
): string {
  return [episodes ? `${episodes} eps` : null, year]
    .filter(Boolean)
    .join(" • ");
}
