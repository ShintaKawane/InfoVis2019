#include <iostream>
#include <fstream>

int main(int argc, char** argv){
  int sx = 256;
  int sy = 256;
  int sz = 256;
  float buf[] = new float[sx * sy];
  
  std::ifstream in(argv[1], std::io::in | std::ios::binary);
  std::ifstream out("conevrt.raw", std::io::out | std::ios::binary);

  for(int i = 0; i < sz; i++){
    
    
  }
  return 0;
}
