const j = require('jscodeshift');

module.exports = (content, { injections }) => {
    const root = j(content);
    const wrapper = j.jsxElement(
        j.jsxOpeningElement(j.jsxIdentifier('div')),
        j.jsxClosingElement(j.jsxIdentifier('div')),
        [j.jsxText('122')],
    );

    const jsxAst = root
        .find(j.VariableDeclarator)
        .filter((v) => {
            return v.node.id.name === 'App';
        })
        .find(j.ReturnStatement)
        .find(j.JSXFragment)
        .get().node.children;

    let b = ['<span></span>', '<p></p>'];

    let outer = b.reduceRight((p, c) => {
        console.log(p);
        console.log(c);
        // let cContent = j(c);
        let pContent = j(p);
        pContent.find(j.JSXElement).forEach((i) => {
            i.node.children.push(c);

            // console.log(i.node.children);
        });

        // let pContent = j(p).get().node;
        // pContent.children = [c];
        // pContent.find(j.JSXElement).forEach((i) => {
        //     console.log(c);
        //     console.log(i.node.children);
        //     i.node.children = [c];
        //     console.log(i.node.children);
        // });

        // pContent.get().node.children = [c];
        // console.log(pContent);
        // console.log(pContent.get().node.children);
        return pContent.get().node;
    }, '<div></div>');

    // let outer = j('<p></p>');

    // // let pContent = j(p);
    // outer.find(j.JSXElement).forEach((p) => {
    //     p.node.children.push(...injections);
    // });

    // outer.get().node.children = injections;
    // console.log(outer.get().node.children);
    // let pContent = j(injections[0]);
    // pContent.get().node.children = [wrapper];
    // let reduceRight = j('<div></div>');
    // reduceRight.get().node.children = b;
    // console.log(reduceRight);

    console.log(outer);

    jsxAst.splice(-1, 0, outer);

    // let a = j(`<Provider></Provider>`)
    //     .find(j.JSXElement)
    //     .forEach((p) => {
    //         p.node.children = '<div>1111</div>';
    //     });

    // console.log(a);
    // const jsxAst = root
    //     .find(j.VariableDeclarator)
    //     .filter((v) => {
    //         return v.node.id.name === 'App';
    //     })
    //     .find(j.ReturnStatement)
    //     .find(j.JSXFragment)
    //     .forEach((path) => {
    //         path.node.children.push(wrapper);
    //     });

    // jsxAst.replaceWith(reduxAst);

    // let reducChildren = reduxAst.find(j.JSXElement).get().node.children;
    // reducChildren.splice(0, 1, '<div>11</div>');

    // jsxAst.unshift(...[...injections, reduxAst]);
    //

    // jsxAst.replaceWith(`${injections[injections.length - 1]}`);

    // console.log(reduxAst);
    // console.log(injections);
    return root.toSource();
};
