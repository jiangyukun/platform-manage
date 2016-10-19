/**
 * Created by jiangyu2016 on 16/10/17.
 */


export function calculatePageIndex(pageTotal, currentPage) {
    var i, j, pageToShowLength = 5;
    var beforeCount = 4, afterCount, current = currentPage;
    var pages = [];

    if (typeof pageTotal != 'number' || pageTotal < 1) {
        return [];
    }
    else if (pageTotal == 1) {
        return [1];
    }
    pages.push(1);

    var start = current - beforeCount;
    if (start < 2) {
        start = 2;
        beforeCount = current - 2;
        if (beforeCount < 0) {
            beforeCount = 0;
        }
    } else if (start > 2) {
        pages.push('...')
    }
    for (i = start; i <= current; i++) {
        pages.push(i);
    }
    afterCount = pageToShowLength - beforeCount;
    for (i = current + 1, j = 0; i < pageTotal; i++) {
        if (j > afterCount) {
            if (i != pageTotal - 1) {
                pages.push('...');
            }
            break;
        }
        pages.push(i);
        j++;
    }
    if (current != pageTotal) {
        pages.push(pageTotal);
    }
    return pages;
}
