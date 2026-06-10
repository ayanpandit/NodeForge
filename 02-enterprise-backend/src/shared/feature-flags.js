export class FeatureFlags {
  /**
   * Scaffolding helper for feature toggling.
   * Enables seamless integrations with providers (LaunchDarkly, Unleash) in the future.
   */
  static isEnabled(flagName, _context = {}) {
    const envFlag = process.env[`FLAG_${flagName.toUpperCase()}`];

    if (envFlag === 'true') return true;
    if (envFlag === 'false') return false;

    // Default configuration fallback
    return false;
  }
}
