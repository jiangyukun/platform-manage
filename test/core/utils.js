/**
 * Created by jiangyukun on 2017/2/23.
 */





function switchArrayPosition(list, index1, index2) {
  list.splice(index1, 1)
  list.splice(index2, 1)

  console.log(list)
}

switchArrayPosition([1, 2, 3, 4], 2, 3)