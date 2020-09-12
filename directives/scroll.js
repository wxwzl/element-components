let directive = {
  bind: function (el, binding, vnode) {
    let obj = binding.value;
    el.addEventListener("scroll", function (e) {
      let scrollD =Math.floor(e.target.scrollTop);
      if ((e.target.scrollHeight - e.target.offsetHeight)-scrollD<=1) {
        obj.onBottom && obj.onBottom();
      }
    }, false);
  }
};
export default directive;