/**
 *
 * 把返回的数据集转换成Tree
 * @method listToTree
 * @param list 要转换的数据集
 * @param pk 子集标记id
 * @param pid parent标记字段
 * @param child 子集生成对象name
 * @param root顶级节点的id
 * @return array
 * @example
 productUtil.listToTree(data.data, 'categoryId', 'parentCategoryId', 'children', '0000');
 */
function listToTree(list, pk, pid, child, root) {
    // 创建Tree
    var tree = {},
        pk = pk ? pk : 'id',
        pid = pid ? pid : 'pid',
        child = child ? child : '_child',
        root = root ? root : '0000';
    if ($.isArray(list)) {
        // 创建基于主键的数组引用
        var refer = {};
        $.each(list, function(key, data) {
            refer[data[pk]] = data;
        });
        $.each(list, function(key, data) {
            // 判断是否存在parent
            var parentId = data[pid];
            if (root == parentId) {
                tree[data[pk]] = data;
            } else {
                if (typeof refer[parentId] != 'undefined') {
                    var parent = refer[parentId];
                    if (typeof parent[child] == 'undefined') {
                        parent[child] = {};
                    }
                    parent[child][data[pk]] = data;
                }
            }
        });
    }
    return tree;
}

/**
 * 点击非elem元素上之后触发的事件
 * @method blankClick
 * @param {jQuery} elem jquery元素
 * @param {function} fn 触发的回调事件
 */
function blankClick(elem, fn) {
    $(document).mouseup(function(e) {
        var _con = $(elem); // 设置目标区域
        if (!_con.is(e.target) && _con.has(e.target).length === 0) { // Mark 1
            fn && fn();
        }
    });
}


module.exports = {
    listToTree,
    blankClick
};
