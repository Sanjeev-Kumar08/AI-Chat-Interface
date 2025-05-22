import { CalculatorPlugin } from "../plugins/CalculatorPlugin";
import { DictionaryPlugin } from "../plugins/DictionaryPlugin";
import { WeatherPlugin } from "../plugins/WeatherPlugin";

export const PluginManager = {
  plugins: [WeatherPlugin, CalculatorPlugin, DictionaryPlugin],

  parseMessage(input) {
    // Check for slash commands first
    for (const plugin of this.plugins) {
      for (const trigger of plugin.triggers) {
        if (input.toLowerCase().startsWith(trigger.toLowerCase())) {
          return { plugin, input };
        }
      }
    }

    // Check for natural language patterns
    for (const plugin of this.plugins) {
      for (const pattern of plugin.patterns) {
        if (pattern.test(input)) {
          return { plugin, input };
        }
      }
    }

    return null;
  },

  async executePlugin(plugin, input) {
    try {
      const data = await plugin.execute(input);
      return { success: true, data, plugin };
    } catch (error) {
      return { success: false, error: error.message, plugin };
    }
  },
};
