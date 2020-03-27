//显示字符长度
export function labelLength(str, maxLen) {
    if (!str) {
        return ''
    } else {
        var newStr = str.split('');
        if (newStr.length < maxLen) {
            return str;
        }
        if (newStr.length >= maxLen) {
            return str.slice(0, maxLen) + "...";
        }
    }
}