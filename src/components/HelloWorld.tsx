import { defineComponent } from "vue";
export default defineComponent({
  name: "HelloWorld",
  setup() {
    return () => (
      <div class="hello-world">
        <h2>Hello from TSX!</h2>
      </div>
    );
  },
});
