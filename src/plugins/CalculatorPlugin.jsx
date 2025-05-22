import { Calculator } from "lucide-react";
import * as math from 'mathjs';

export const CalculatorPlugin = {
  name: "calculator",
  triggers: ["/calc", "/calculate"],
  patterns: [/calculate (.*)/i, /what'?s (.*)/i, /solve (.*)/i],

  async execute(input) {
    const expression = this.extractExpression(input);
    if (!expression)
      throw new Error("Please provide a mathematical expression");

    try {
      // Use mathjs for safe evaluation
      const result = math.evaluate(expression);
      return {
        expression,
        result: result.toString(),
        type: typeof result,
      };
    } catch (error) {
      throw new Error("Invalid mathematical expression");
    }
  },

  extractExpression(input) {
    // Extract from slash command
    const slashMatch = input.match(/\/calc(?:ulate)?\s+(.+)/i);
    if (slashMatch) return slashMatch[1].trim();

    // Extract from natural language
    for (const pattern of this.patterns) {
      const match = input.match(pattern);
      if (match) return match[1].trim();
    }
    return null;
  },

  render(data) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-sm">
        <div className="flex items-center gap-2 mb-3">
          <Calculator className="text-green-600" size={20} />
          <h3 className="font-semibold text-green-800">Calculator</h3>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-600">Expression:</div>
          <div className="font-mono bg-gray-100 p-2 rounded text-sm">
            {data.expression}
          </div>
          <div className="text-sm text-gray-600">Result:</div>
          <div className="font-mono bg-gray-100 p-2 rounded text-lg font-bold text-green-700">
            {data.result}
          </div>
        </div>
      </div>
    );
  },
};
