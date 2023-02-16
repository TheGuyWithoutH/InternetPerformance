/**
 * @file Tests for array statictics functions
 * @author Ugo Balducci
 * @version 1.0.0
 */

const { sum, mean, standardDeviation: sd, median, quantile, Q1, Q3 } = require("../services/api/arrayStatistics")

describe("Tests Sum", () => {
    test("Sum of empty array", () => {
        expect(() => sum()).toThrow()
    })

    test("Sum of array with one element", () => {
        expect(sum([1])).toBe(1)
        expect(sum([256])).toBe(256)
        expect(sum([Number.POSITIVE_INFINITY])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Sum of array with multiple elements", () => {
        expect(sum([0, 0, 0, 0, 0])).toBe(0)
        expect(sum([1, 2, 3, 4, 5])).toBe(15)
        expect(sum([256, 512, 895, 100054])).toBe(101717)
        expect(sum([Number.POSITIVE_INFINITY, 1, 8, 17, 87])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Sum of string array", () => {
        expect(() => sum(["John", "Doe", "Jane", "Alice", "Bob"])).toThrow()
    })
})

describe("Tests Mean", () => {
    test("Mean of empty array", () => {
        expect(() => sum()).toThrow()
    })

    test("Mean of array with one element", () => {
        expect(mean([1])).toBe(1)
        expect(mean([256])).toBe(256)
        expect(mean([Number.POSITIVE_INFINITY])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Mean of array with multiple elements", () => {
        expect(mean([0, 0, 0, 0, 0])).toBe(0)
        expect(mean([1, 2, 3, 4, 5])).toBe(3)
        expect(mean([256, 512, 895, 100054])).toBe(25429.25)
        expect(mean([Number.POSITIVE_INFINITY, 1, 8, 17, 87])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Mean of string array", () => {
        expect(() => sum(["John", "Doe", "Jane", "Alice", "Bob"])).toThrow()
    })
})

describe("Tests Median", () => {
    test("Median of empty array", () => {
        expect(() => median()).toThrow()
    })

    test("Median of array with one element", () => {
        expect(median([1])).toBe(1)
        expect(median([256])).toBe(256)
        expect(median([Number.POSITIVE_INFINITY])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Median of array with even number of elements", () => {
        expect(median([0, 0, 0, 0])).toBe(0)
        expect(median([1, 2, 4, 5])).toBe(3)
        expect(median([1, 2, 3, 5])).toBe(2.5)
        expect(median([256, 512, 895, 100054])).toBe(703.5)
        expect(median([512, 895, 100054, 256].sort(() => (Math.random() > .5) ? 1 : -1))).toBe(703.5)
        expect(median([Number.POSITIVE_INFINITY, 1, 17, 87])).toBe(52)
        expect(median([Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 87])).toBe(Number.POSITIVE_INFINITY)
    })
    
    test("Median of array with odd number of elements", () => {
        expect(median([0, 0, 0, 0, 0])).toBe(0)
        expect(median([1, 2, 3, 4, 5])).toBe(3)
        expect(median([3008, 256, 512, 895, 100054].sort(() => (Math.random() > .5) ? 1 : -1))).toBe(895)
        expect(median([Number.POSITIVE_INFINITY, 1, 8, 17, 87])).toBe(17)
        expect(median([Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 87])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Median of string array", () => {
        expect(() => median(["John", "Doe", "Jane", "Alice", "Bob"])).toThrow()
    })
})

describe("Tests Standard Deviation", () => {
    test("Standard Deviation of empty array", () => {
        expect(() => sd()).toThrow()
    })

    test("Standard Deviation of array with one element", () => {
        expect(sd([1])).toBe(0)
        expect(sd([256])).toBe(0)
        expect(sd([Number.POSITIVE_INFINITY])).toBe(0)
    })

    test("Standard Deviation of array with multiple element", () => {
        expect(sd([0, 0, 0, 0, 0])).toBe(0)
        expect(sd([1, 2, 3, 4, 5])).toBeCloseTo(Math.sqrt(2))
        expect(sd([256, 512, 895, 100054])).toBeCloseTo(43085.219619813)
        expect(sd([Number.POSITIVE_INFINITY, 1, 8, 17, 87])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Standard Deviation of string array", () => {
        expect(() => sd(["John", "Doe", "Jane", "Alice", "Bob"])).toThrow()
    })
})

describe("Tests Quantiles", () => {
    test("Quantile 0.25 of empty array", () => {
        expect(() => quantile([], 0.25)).toThrow()
    })

    test("Quantiles of array with one element", () => {
        expect(quantile([1], 0.25)).toBe(1)
        expect(quantile([1], 0.9)).toBe(1)

        expect(quantile([256], 0.25)).toBe(256)
        expect(quantile([256], 0.9)).toBe(256)

        expect(quantile([Number.POSITIVE_INFINITY], 0.25)).toBe(Number.POSITIVE_INFINITY)
        expect(quantile([Number.POSITIVE_INFINITY], 0.9)).toBe(Number.POSITIVE_INFINITY)
    })

    test("Q1 of array with multiple element", () => {
        expect(Q1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(0)
        expect(Q1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])).toBe(8)
        expect(Q1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32])).toBe(8.5)
        expect(Q1([31682, 266297, 638078, 1142858, 1418590, 1534591, 2793397, 2854826, 2873304, 2945384, 3162466, 3194253, 4684897, 5299317, 5310666, 5557836, 5656558, 5684523, 5736026, 6372255, 6659620, 7143824, 7271886, 7281370, 7573523, 8068853, 8208718, 8984704, 9311923, 9470269])).toBe(2854826)
        expect(Q1([1, 26, 31682, 266297, 638078, 1142858, 1418590, 1534591, 2793397, 2854826, 2873304, 2945384, 3162466, 3194253, 4684897, 5299317, 5310666, 5557836, 5656558, 5684523, 5736026, 6372255, 6659620, 7143824, 7271886, 7281370, 7573523, 8068853, 8208718, 8984704, 9311923, 9470269])).toBe(2163994)
        expect(Q1([Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 1, 8, 17, 87])).toBe(17)
    })

    test("Q3 of array with multiple element", () => {
        expect(Q3([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(0)
        expect(Q3([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30])).toBe(23)
        expect(Q3([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32])).toBe(24.5)
        expect(Q3([31682, 266297, 638078, 1142858, 1418590, 1534591, 2793397, 2854826, 2873304, 2945384, 3162466, 3194253, 4684897, 5299317, 5310666, 5557836, 5656558, 5684523, 5736026, 6372255, 6659620, 7143824, 7271886, 7281370, 7573523, 8068853, 8208718, 8984704, 9311923, 9470269])).toBe(7271886)
        expect(Q3([1, 26, 31682, 266297, 638078, 1142858, 1418590, 1534591, 2793397, 2854826, 2873304, 2945384, 3162466, 3194253, 4684897, 5299317, 5310666, 5557836, 5656558, 5684523, 5736026, 6372255, 6659620, 7143824, 7271886, 7281370, 7573523, 8068853, 8208718, 8984704, 9311923, 9470269])).toBe(7207855)
        expect(Q3([Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 1, 8, 17, 87])).toBe(Number.POSITIVE_INFINITY)
    })

    test("Quantile 0.9 of array with multiple element", () => {
        expect(quantile([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 0.9)).toBe(0)
        expect(quantile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 0.9)).toBe(27.5)
        expect(quantile([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 0.9)).toBe(29)
        expect(quantile([31682, 266297, 638078, 1142858, 1418590, 1534591, 2793397, 2854826, 2873304, 2945384, 3162466, 3194253, 4684897, 5299317, 5310666, 5557836, 5656558, 5684523, 5736026, 6372255, 6659620, 7143824, 7271886, 7281370, 7573523, 8068853, 8208718, 8984704, 9311923, 9470269], 0.9)).toBe(8596711)
        expect(quantile([1, 26, 31682, 266297, 638078, 1142858, 1418590, 1534591, 2793397, 2854826, 2873304, 2945384, 3162466, 3194253, 4684897, 5299317, 5310666, 5557836, 5656558, 5684523, 5736026, 6372255, 6659620, 7143824, 7271886, 7281370, 7573523, 8068853, 8208718, 8984704, 9311923, 9470269], 0.9)).toBe(8208718)
        expect(quantile([Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, 1, 8, 17, 87], 0.9)).toBe(Number.POSITIVE_INFINITY)
    })

    test("Quantiles of string array", () => {
        expect(() => quantile(["John", "Doe", "Jane", "Alice", "Bob"], 0.9)).toThrow()
    })
})