import React from 'react'
import { Tree } from 'antd'
import '../index.styl'

const TreeNode = Tree.TreeNode

const SetUpcom = ({ props }) => {
    function onSelect(selectedKeys, info) {
        console.log('selected', selectedKeys, info)
    }
    function onCheck(checkedKeys, info) {
        console.log('onCheck', checkedKeys, info)
    }
    return (
        <div className='page-setup'>
            <Tree
                checkable
                defaultExpandedKeys={['0-0', '0-0-0', '0-1', '0-1-0', '0-2', '0-2-0']}
                onSelect={onSelect}
                onCheck={onCheck}
            >
                <TreeNode title='用户管理' key='0-0'>
                    <TreeNode title='用户信息' key='0-0-0'>
                        <TreeNode title='查询' key='0-0-0-0' />
                        <TreeNode title='添加' key='0-0-0-1' />
                        <TreeNode title='删除' key='0-0-0-2' />
                        <TreeNode title='修改' key='0-0-0-3' />
                        <TreeNode title='导入' key='0-0-0-4' />
                    </TreeNode>
                </TreeNode>
                <TreeNode title='设备管理' key='0-1'>
                    <TreeNode title='设备固件管理' key='0-1-0'>
                        <TreeNode title='查询' key='0-1-0-0' />
                        <TreeNode title='添加' key='0-1-0-1' />
                        <TreeNode title='删除' key='0-1-0-2' />
                        <TreeNode title='修改' key='0-1-0-3' />
                        <TreeNode title='导入' key='0-1-0-4' />
                    </TreeNode>
                </TreeNode>
                <TreeNode title='权限管理' key='0-2'>
                    <TreeNode title='权限分配' key='0-2-0'>
                        <TreeNode title='查询' key='0-2-0-0' />
                        <TreeNode title='添加' key='0-2-0-1' />
                        <TreeNode title='删除' key='0-2-0-2' />
                        <TreeNode title='修改' key='0-2-0-3' />
                        <TreeNode title='导入' key='0-2-0-4' />
                    </TreeNode>
                </TreeNode>
            </Tree>
        </div>
    )
}

export default SetUpcom
