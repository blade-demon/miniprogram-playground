export const formatTime = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = (n: number) => {
  const s = n.toString();
  return s[1] ? s : "0" + s;
};

/**
 * 格式化数字，添加千分位分隔符
 * @param num 要格式化的数字
 * @param decimals 小数位数，默认为2
 * @returns 格式化后的字符串
 */
export function formatNumberWithCommas(
  num: number,
  decimals: number = 2
): string {
  // 先格式化为指定小数位数
  const fixedNum = num.toFixed(decimals);

  // 分离整数部分和小数部分
  const parts = fixedNum.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] || "0".repeat(decimals);

  // 对整数部分添加千分位分隔符
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 组合整数和小数部分
  return `${formattedInteger}.${decimalPart}`;
}

/**
 * 格式化货币显示
 * @param num 金额数字
 * @param currency 货币符号，默认为空
 * @param decimals 小数位数，默认为2
 * @returns 格式化后的货币字符串
 */
export function formatCurrency(
  num: number,
  currency: string = "",
  decimals: number = 2
): string {
  const formatted = formatNumberWithCommas(num, decimals);
  return currency ? `${currency}${formatted}` : formatted;
}

/**
 * 格式化百分比
 * @param num 百分比数字（0-1之间）
 * @param decimals 小数位数，默认为2
 * @returns 格式化后的百分比字符串
 */
export function formatPercentage(num: number, decimals: number = 2): string {
  const percentage = (num * 100).toFixed(decimals);
  return `${percentage}%`;
}

/**
 * 简化大数字显示（如：1.2万、1.5亿）
 * @param num 数字
 * @param decimals 小数位数，默认为1
 * @returns 简化后的字符串
 */
export function formatLargeNumber(num: number, decimals: number = 1): string {
  if (num >= 100000000) {
    return `${(num / 100000000).toFixed(decimals)}亿`;
  } else if (num >= 10000) {
    return `${(num / 10000).toFixed(decimals)}万`;
  } else {
    return formatNumberWithCommas(num, 0);
  }
}

/**
 * 测试数字格式化功能
 */
export function testNumberFormatting() {
  const testCases = [
    { input: 100000, expected: "100,000.00" },
    { input: 1234567.89, expected: "1,234,567.89" },
    { input: 999.99, expected: "999.99" },
    { input: 1000, expected: "1,000.00" },
    { input: 123.456, expected: "123.46" },
  ];

  console.log("=== 数字格式化测试 ===");
  testCases.forEach(({ input, expected }) => {
    const result = formatNumberWithCommas(input);
    const passed = result === expected;
    console.log(
      `${input} -> ${result} ${passed ? "✅" : "❌ (期望: " + expected + ")"}`
    );
  });

  console.log("\n=== 货币格式化测试 ===");
  console.log(`100000 -> ${formatCurrency(100000, "¥")}`);
  console.log(`1234567.89 -> ${formatCurrency(1234567.89, "$")}`);

  console.log("\n=== 大数字简化测试 ===");
  console.log(`15000 -> ${formatLargeNumber(15000)}`);
  console.log(`150000000 -> ${formatLargeNumber(150000000)}`);
}
