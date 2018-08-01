'use strict';

module.exports = app => {
    class nodemaiService extends app.Service {
        async getMenus(result){
            var array=[];
            for(var i=0;i<result.length;i++){
            let newV=result[i];
            let p=newV.parent;
            var len=p.toString().length;
            //取出一级菜单
            if(p== 0){
                    let obj={
                        path:newV.path,
                        component:newV.component,
                        id:newV.menu_id,
                        name:newV.name,
                        label:newV.name,
                        children:[],
                        role_id:newV.role_id,
                        meta:{
                            icon:newV.icon,
                            title:newV.title
                        },
                        redirect:'noredirect',
                    }
                    array.push(obj);
                }
                //取出二级菜单
                if(len == 4){
                    for(var j=0;j<array.length;j++){
                        if(p==array[j].id){
                            let obj={
                                id:newV.menu_id,
                                name:newV.name,
                                children:[],
                                path:newV.path,
                                label:newV.name,
                                role_id:newV.role_id,
                                meta:{
                                title:newV.title
                                },
                                component:newV.component
                            }
                            if(newV.icon){
                                obj.meta.icon=newV.icon;
                            }
                            array[j].children.push(obj);
                        }
                    }
                }
                //取出三级菜单
                if(len == 6){
                    for(var h=0;h<array.length;h++){
                        for(var k=0;k<array[h].children.length;k++){
                            if(p==array[h].children[k].id){
                                let obj={
                                    id:newV.menu_id,
                                    name:newV.name,
                                    children:[],
                                    path:newV.path,
                                    label:newV.name,
                                    role_id:newV.role_id,
                                    meta:{
                                        title:newV.title
                                    },
                                    component:newV.component
                                }
                                if(newV.icon){
                                obj.meta.icon=newV.icon;
                                }
                                array[h].children[k].children.push(obj);
                            }
                        }
                    }
                }
                //取出四级菜单
                if(len == 8){
                    for(var h=0;h<array.length;h++){
                        for(var k=0;k<array[h].children.length;k++){
                            for(var l=0;l<array[h].children[k].children.length;l++){
                                if(p==array[h].children[k].children[l].id){
                                    let obj={
                                        id:newV.menu_id,
                                        name:newV.name,
                                        children:[],
                                        path:newV.path,
                                        label:newV.name,
                                        role_id:newV.role_id,
                                        meta:{
                                            icon:newV.icon,
                                            title:newV.title
                                        },
                                        component:newV.component
                                    }
                                    array[h].children[k].children[l].children.push(obj);
                                }
                            }
                        }
                    }
                }
            }
            return array;
        }
    }
    return nodemaiService;
  };